import { NextResponse } from "next/server";
import { generateExplanation, getAIStatus } from "@/lib/ai/gemma";

/**
 * Streaming AI Route - Next.js 15 + React 19
 * Real-time AI responses with Server Streaming
 */

export async function GET() {
  const aiStatus = await getAIStatus();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ai/stream/",
    methods: ["POST", "OPTIONS"],
    backend: aiStatus.type,
    model: aiStatus.model,
  });
}

export async function OPTIONS() {
  return NextResponse.json({ ok: true, methods: ["GET", "POST", "OPTIONS"] });
}

function formatStudyPack(
  result: Awaited<ReturnType<typeof generateExplanation>>["response"]
): string {
  const sections: string[] = [];

  if (result.summary) {
    sections.push(`Summary\n${result.summary}`);
  }

  sections.push(result.explanation || "Explanation unavailable.");

  if (result.context) {
    sections.push(`Context\n${result.context}`);
  }

  if (result.commonGround?.length) {
    sections.push(`Shared themes\n- ${result.commonGround.join("\n- ")}`);
  }

  if (result.differences?.length) {
    sections.push(
      `Key differences\n${result.differences
        .map((difference) => `- ${difference.topic}: ${difference.insight}`)
        .join("\n")}`
    );
  }

  if (result.learningObjectives?.length) {
    sections.push(`Learning objectives\n- ${result.learningObjectives.join("\n- ")}`);
  }

  if (result.classroomUse?.length) {
    sections.push(`Classroom use\n- ${result.classroomUse.join("\n- ")}`);
  }

  if (result.lessonPlan) {
    sections.push(
      `Lesson plan: ${result.lessonPlan.title}\nAudience: ${result.lessonPlan.audience}\nObjectives\n- ${result.lessonPlan.objectives.join("\n- ")}\nSteps\n${result.lessonPlan.steps
        .map(
          (step) =>
            `${step.step}. ${step.title}\n   Activity: ${step.activity}\n   Outcome: ${step.outcome}`
        )
        .join(
          "\n"
        )}${result.lessonPlan.assignment ? `\nAssignment\n${result.lessonPlan.assignment}` : ""}`
    );
  }

  if (result.practice) {
    sections.push(`Practice\n${result.practice}`);
  }

  if (result.followUpQuestions?.length) {
    sections.push(`Follow-up questions\n- ${result.followUpQuestions.join("\n- ")}`);
  }

  if (result.references?.length) {
    sections.push(
      `References\n- ${result.references
        .map((reference) => `${reference.scripture} ${reference.chapter}.${reference.verse}`)
        .join("\n- ")}`
    );
  }

  return sections.join("\n\n");
}

export async function POST(req: Request) {
  try {
    const { messages, scripture, chapter, verse, compareScriptureIds, mode, audience } =
      await req.json();
    const aiStatus = await getAIStatus();
    const latestUserMessage = Array.isArray(messages)
      ? [...messages]
          .reverse()
          .find(
            (message: { role?: string; content?: string }) =>
              message?.role === "user" &&
              typeof message.content === "string" &&
              message.content.trim().length > 0
          )
      : null;

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "A user message is required for streaming." },
        { status: 400 }
      );
    }

    if (!aiStatus.available) {
      return NextResponse.json(
        {
          error:
            "Gemma is not configured. Accepting access on Kaggle is not enough by itself. Set GEMMA_API_KEY for hosted access, or run Ollama locally.",
          backend: aiStatus.type,
          model: aiStatus.model,
        },
        { status: 503 }
      );
    }

    const userId =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";
    const encoder = new TextEncoder();
    const result = await generateExplanation(
      {
        query: latestUserMessage.content.trim(),
        scriptureId: scripture,
        compareScriptureIds,
        chapter,
        verse,
        language: "en",
        mode,
        audience,
      },
      userId
    );
    const text = formatStudyPack(result.response);
    const chunks = text.match(/.{1,120}(\s|$)/g) || [text];

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/plain; charset=utf-8",
        "X-HindAI-Compare-Card": JSON.stringify({
          commonGround: result.response.commonGround || [],
          differences: result.response.differences || [],
          classroomUse: result.response.classroomUse || [],
        }),
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Streaming error:", error);
    return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
  }
}

// Use the default Node runtime in development for reliable local streaming.
