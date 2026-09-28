import {
  getOpenRouterApiKey,
  OPENROUTER_MODEL,
  OPENROUTER_URL,
  openRouterHeaders,
} from "@/lib/ai/openrouter";
import { COMPETITION_MODEL, type AgentBackendName } from "./types";
import { createMockModel, type AgentModel } from "./loop";

type ChatResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

async function completeChat(
  url: string,
  headers: Record<string, string>,
  body: object
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Model HTTP ${response.status}`);
  }
  const data = (await response.json()) as ChatResponse;
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export function resolveAgentBackend(): AgentBackendName {
  const configured = (process.env.HINDAI_AGENT_BACKEND || "").trim().toLowerCase();
  if (configured === "openrouter" || configured === "ollama" || configured === "mock") {
    return configured;
  }
  if (getOpenRouterApiKey()) {
    return "openrouter";
  }
  if ((process.env.OLLAMA_URL || "").trim()) {
    return "ollama";
  }
  return "mock";
}

export function createConfiguredAgentModel(): AgentModel {
  const backend = resolveAgentBackend();
  if (backend === "mock") {
    return createMockModel();
  }

  if (backend === "ollama") {
    const base = (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/+$/, "");
    const model = process.env.OLLAMA_MODEL || "gemma4:latest";
    return {
      backend,
      model,
      async complete(prompt: string) {
        return completeChat(
          `${base}/v1/chat/completions`,
          { "Content-Type": "application/json" },
          {
            model,
            temperature: 0.2,
            messages: [
              {
                role: "system",
                content: `You are a coding agent using ${COMPETITION_MODEL} tool names.`,
              },
              { role: "user", content: prompt },
            ],
          }
        );
      },
    };
  }

  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    return createMockModel();
  }

  return {
    backend: "openrouter",
    model: OPENROUTER_MODEL,
    async complete(prompt: string) {
      return completeChat(OPENROUTER_URL, openRouterHeaders(apiKey, "Hind AI Developer Agent"), {
        model: OPENROUTER_MODEL,
        temperature: 0.2,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content:
              'You are Hind AI\'s Gemma 4 developer agent. Emit <tool_call>{"name":"read_file","arguments":{...}}</tool_call> using only harness tool names.',
          },
          { role: "user", content: prompt },
        ],
      });
    },
  };
}
