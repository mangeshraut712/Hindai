type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type Env = {
  AI: {
    run: (
      model: string,
      input: Record<string, unknown>
    ) => Promise<ReadableStream | { response?: string; result?: { response?: string } }>;
  };
  GEMMA_MODEL: string;
  OPENROUTER_MODEL: string;
  OPENROUTER_API_KEY?: string;
  SARVAM_API_KEY?: string;
};

const ALLOWED_ORIGINS = [
  "https://mangeshraut712.github.io",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3100",
];

const HINDAI_SYSTEM =
  "You are Hind AI, a Gemma 4 powered digital gurukul for ancient Indian scripture study. Give accurate, humble, source-aware guidance. Include Devanagari with transliteration when useful. Do not invent citations.";

function firstSseDataPayload(event: string): string | undefined {
  for (const line of event.split("\n")) {
    if (line.startsWith("data: ")) {
      return line.slice(6).trim();
    }
  }
  return undefined;
}

const DHARMA_SYSTEM = `${HINDAI_SYSTEM}

You are also a Dharma Guide. Cover Purusharthas, daily rituals, vratas, samskaras, sadhana, festivals, and pilgrimage. Prefer safe, practical advice and tell the reader to consult a qualified teacher for intense practice or major life decisions.`;

const QUIZ_SYSTEM = `Create one high-quality multiple-choice quiz question about Indian scriptures.

Return ONLY one valid JSON object:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": 0,
  "explanation": "string",
  "scripture": "string",
  "difficulty": "easy"
}

Rules: exactly 4 options; correctAnswer is 0-3; difficulty is easy, medium, or hard; no markdown.`;

function corsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Expose-Headers": "x-hindai-backend, x-hindai-model",
    Vary: "Origin",
  };
}

function json(data: unknown, init: ResponseInit = {}, origin: string | null = null): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
      ...(init.headers || {}),
    },
  });
}

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

function extractJsonObject(input: string): string | null {
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return input.slice(start, end + 1);
}

function extractText(payload: unknown): string {
  if (typeof payload === "string") {
    return payload;
  }
  if (!payload || typeof payload !== "object") {
    return "";
  }
  const record = payload as Record<string, unknown>;
  if (typeof record.response === "string") {
    return record.response;
  }
  if (record.result && typeof record.result === "object") {
    const nested = record.result as Record<string, unknown>;
    if (typeof nested.response === "string") {
      return nested.response;
    }
  }
  const choice = (record.choices as Array<{ message?: { content?: string } }> | undefined)?.[0]
    ?.message?.content;
  return typeof choice === "string" ? choice : "";
}

async function completeWithWorkersAi(env: Env, messages: ChatMessage[]): Promise<string> {
  const result = await env.AI.run(env.GEMMA_MODEL, {
    messages,
    stream: false,
    chat_template_kwargs: { enable_thinking: false },
  });
  const text = extractText(result).trim();
  if (!text) {
    throw new Error("Workers AI Gemma 4 returned an empty response.");
  }
  return text;
}

async function completeWithOpenRouter(
  env: Env,
  messages: ChatMessage[],
  options: { stream?: boolean; title?: string } = {}
): Promise<Response> {
  const apiKey = (env.OPENROUTER_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://mangeshraut712.github.io/Hindai/",
      "X-Title": options.title || "Hind AI",
    },
    body: JSON.stringify({
      model: env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free",
      messages,
      stream: Boolean(options.stream),
      temperature: 0.55,
      max_tokens: 1600,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
  }

  return response;
}

function preferOpenRouter(env: Env): boolean {
  return Boolean((env.OPENROUTER_API_KEY || "").trim());
}

async function completeText(env: Env, messages: ChatMessage[]): Promise<string> {
  if (preferOpenRouter(env)) {
    const response = await completeWithOpenRouter(env, messages, { stream: false });
    const data = (await response.json()) as unknown;
    const text = extractText(data).trim();
    if (!text) {
      throw new Error("OpenRouter Gemma 4 returned an empty response.");
    }
    return text;
  }
  return completeWithWorkersAi(env, messages);
}

function sseChunk(content: string): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`);
}

async function streamAsSse(
  env: Env,
  messages: ChatMessage[],
  origin: string | null
): Promise<Response> {
  if (preferOpenRouter(env)) {
    const upstream = await completeWithOpenRouter(env, messages, { stream: true });
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data) as {
                  choices?: Array<{ delta?: { content?: string } }>;
                };
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) controller.enqueue(sseChunk(content));
              } catch {
                // skip malformed SSE
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "x-hindai-backend": "openrouter",
        "x-hindai-model": env.OPENROUTER_MODEL,
        ...corsHeaders(origin),
      },
    });
  }

  const result = await env.AI.run(env.GEMMA_MODEL, {
    messages,
    stream: true,
    chat_template_kwargs: { enable_thinking: false },
  });

  if (result instanceof ReadableStream) {
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = result.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const content = extractStreamDelta(chunk);
            if (content) controller.enqueue(sseChunk(content));
          }
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "x-hindai-backend": "workers-ai",
        "x-hindai-model": env.GEMMA_MODEL,
        ...corsHeaders(origin),
      },
    });
  }

  const text = extractText(result);
  const stream = new ReadableStream({
    start(controller) {
      if (text) controller.enqueue(sseChunk(text));
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "x-hindai-backend": "workers-ai",
      "x-hindai-model": env.GEMMA_MODEL,
      ...corsHeaders(origin),
    },
  });
}

function extractStreamDelta(chunk: string): string {
  let text = "";
  for (const line of chunk.split("\n")) {
    const payload = line.startsWith("data: ") ? line.slice(6).trim() : line.trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload) as {
        response?: string;
        content?: string;
        choices?: Array<{ delta?: { content?: string } }>;
      };
      text += parsed.choices?.[0]?.delta?.content ?? parsed.response ?? parsed.content ?? "";
    } catch {
      text += payload;
    }
  }
  return text;
}

async function streamAsPlain(
  env: Env,
  messages: ChatMessage[],
  origin: string | null
): Promise<Response> {
  const sse = await streamAsSse(env, messages, origin);
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = sse.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const event of events) {
            const data = firstSseDataPayload(event);
            if (!data || data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data) as { content?: string };
              if (parsed.content) controller.enqueue(new TextEncoder().encode(parsed.content));
            } catch {
              controller.enqueue(new TextEncoder().encode(data));
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "x-hindai-backend": preferOpenRouter(env) ? "openrouter" : "workers-ai",
      "x-hindai-model": preferOpenRouter(env) ? env.OPENROUTER_MODEL : env.GEMMA_MODEL,
      ...corsHeaders(origin),
    },
  });
}

function latestUserText(body: Record<string, unknown>): string {
  if (typeof body.query === "string" && body.query.trim()) {
    return body.query.trim();
  }
  if (typeof body.message === "string" && body.message.trim()) {
    return body.message.trim();
  }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const latest = [...messages]
    .reverse()
    .find(
      (message) =>
        message &&
        typeof message === "object" &&
        (message as ChatMessage).role === "user" &&
        typeof (message as ChatMessage).content === "string"
    ) as ChatMessage | undefined;
  return latest?.content.trim() || "";
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (
      request.method === "GET" &&
      (path === "/" || path === "/api/health" || path === "/health")
    ) {
      return json(
        {
          ok: true,
          backend: preferOpenRouter(env) ? "openrouter" : "workers-ai",
          model: preferOpenRouter(env) ? env.OPENROUTER_MODEL : env.GEMMA_MODEL,
          endpoints: [
            "/api/ai/chat",
            "/api/ai/stream",
            "/api/ai/dharma",
            "/api/ai/translate",
            "/api/ai/quiz",
            "/api/sanskrit/chat",
            "/api/pothi/speak",
          ],
        },
        {},
        origin
      );
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, { status: 405 }, origin);
    }

    try {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

      if (path === "/api/pothi/speak") {
        const text = typeof body.text === "string" ? body.text.trim() : "";
        const locale =
          body.locale === "en"
            ? "en-IN"
            : body.locale === "hi" || body.locale === "roman"
              ? "hi-IN"
              : "mr-IN";
        const speaker = locale === "en-IN" ? "shubh" : "ritu";
        if (!text) {
          return json({ error: "Text is required." }, { status: 400 }, origin);
        }
        if (!env.SARVAM_API_KEY) {
          return json({ engine: "browser", fallback: true }, {}, origin);
        }
        const sarvam = await fetch("https://api.sarvam.ai/text-to-speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-subscription-key": env.SARVAM_API_KEY,
          },
          body: JSON.stringify({
            text: text.slice(0, 2400),
            language_code: locale,
            model: "bulbul:v3",
            speaker,
            pace: 0.82,
            output_audio_codec: "mp3",
          }),
        });
        if (!sarvam.ok) {
          const detail = await sarvam.text();
          return json(
            { engine: "browser", fallback: true, error: detail.slice(0, 240) },
            {},
            origin
          );
        }
        const payload = (await sarvam.json()) as { audios?: string[] };
        const base64 = payload.audios?.[0];
        if (!base64) {
          return json({ engine: "browser", fallback: true }, {}, origin);
        }
        return json({ mime: "audio/mpeg", base64, engine: "sarvam-bulbul-v3" }, {}, origin);
      }

      if (path === "/api/ai/chat") {
        const userText = latestUserText(body);
        if (!userText)
          return json({ error: "A user message is required." }, { status: 400 }, origin);
        const incoming = Array.isArray(body.messages)
          ? (body.messages as ChatMessage[]).filter((message) => message?.content)
          : [{ role: "user" as const, content: userText }];
        const messages: ChatMessage[] = [
          { role: "system", content: HINDAI_SYSTEM },
          ...incoming.filter((message) => message.role !== "system"),
        ];
        return streamAsSse(env, messages, origin);
      }

      if (path === "/api/ai/stream") {
        const userText = latestUserText(body);
        if (!userText)
          return json({ error: "A user message is required." }, { status: 400 }, origin);
        const mode = typeof body.mode === "string" ? body.mode : "explain";
        const audience = typeof body.audience === "string" ? body.audience : "general";
        const messages: ChatMessage[] = [
          { role: "system", content: `${HINDAI_SYSTEM}\nMode: ${mode}. Audience: ${audience}.` },
          { role: "user", content: userText },
        ];
        return streamAsPlain(env, messages, origin);
      }

      if (path === "/api/ai/dharma") {
        const userText = latestUserText(body);
        if (!userText) return json({ error: "Query is required" }, { status: 400 }, origin);
        const context = typeof body.context === "string" ? body.context : "";
        const messages: ChatMessage[] = [
          { role: "system", content: DHARMA_SYSTEM },
          {
            role: "user",
            content: context ? `Context: ${context}\n\nQuery: ${userText}` : userText,
          },
        ];
        return streamAsSse(env, messages, origin);
      }

      if (path === "/api/ai/translate") {
        const sourceText =
          (typeof body.text === "string" && body.text.trim()) ||
          (typeof body.sanskrit === "string" && body.sanskrit.trim()) ||
          "";
        if (!sourceText) {
          return json({ error: "Text is required for translation" }, { status: 400 }, origin);
        }
        const targetLang = typeof body.targetLang === "string" ? body.targetLang : "en";
        const text = await completeText(env, [
          {
            role: "system",
            content:
              'Translate Indic scripture faithfully. Return JSON only: {"translation":"...","transliteration":"..."}',
          },
          {
            role: "user",
            content: `Translate this text to ${targetLang}:\n${sourceText}`,
          },
        ]);
        const parsed = extractJsonObject(text);
        let translation = text;
        let transliteration = sourceText;
        if (parsed) {
          try {
            const data = JSON.parse(parsed) as { translation?: string; transliteration?: string };
            translation = data.translation || text;
            transliteration = data.transliteration || sourceText;
          } catch {
            translation = text;
          }
        }
        return json(
          {
            sanskrit: sourceText,
            text: sourceText,
            translation,
            transliteration,
            targetLang,
            backend: preferOpenRouter(env) ? "openrouter" : "workers-ai",
          },
          {},
          origin
        );
      }

      if (path === "/api/ai/quiz") {
        const topic =
          typeof body.topic === "string" && body.topic.trim()
            ? body.topic.trim()
            : "Bhagavad Gita, Yoga Sutras, Upanishads, Ramayana, or Mahabharata";
        const text = await completeText(env, [
          { role: "system", content: QUIZ_SYSTEM },
          { role: "user", content: `Create one quiz question about: ${topic}` },
        ]);
        const parsed = extractJsonObject(text);
        if (!parsed) {
          throw new Error("Gemma did not return a valid quiz question payload.");
        }
        const question = JSON.parse(parsed);
        return json(
          {
            question,
            model: preferOpenRouter(env) ? env.OPENROUTER_MODEL : env.GEMMA_MODEL,
          },
          {},
          origin
        );
      }

      if (path === "/api/sanskrit/chat") {
        const message = latestUserText(body);
        if (!message) return json({ error: "Message is required." }, { status: 400 }, origin);
        const mode = typeof body.mode === "string" ? body.mode : "learn";
        const lang = body.lang === "hi" ? "Hindi" : "English";
        const reply = await completeText(env, [
          {
            role: "system",
            content: `${HINDAI_SYSTEM}\nYou are SanskritNova. Mode: ${mode}. Reply in ${lang}.`,
          },
          { role: "user", content: message },
        ]);
        return json(
          {
            reply,
            mode,
            model: preferOpenRouter(env) ? env.OPENROUTER_MODEL : env.GEMMA_MODEL,
            transliteration: message,
          },
          {},
          origin
        );
      }

      return json({ error: `Unknown endpoint: ${path}` }, { status: 404 }, origin);
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : "Gemma 4 gateway failed." },
        { status: 503 },
        origin
      );
    }
  },
};

export default worker;
