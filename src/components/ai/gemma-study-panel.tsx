"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServerFeatureNotice } from "@/components/ai/server-feature-notice";
import { SiteRichResults } from "@/components/ai/site-rich-results";
import { retrieveSitePages, siteGroundingBlock, type SiteRetrieval } from "@/lib/ai/site-knowledge";
import {
  buildStudyPrompt,
  studyActions,
  studyAnswerLines,
  studyPanelCopy,
  type StudyAction,
  type StudyKind,
} from "@/lib/ai/study-prompts";
import { appFetch } from "@/lib/runtime/app-fetch";

interface GemmaStudyPanelProps {
  kind: StudyKind;
  title: string;
  context: string;
  contextLimit?: number;
  answerLanguage?: string;
  scopeToPassage?: boolean;
}

function answerLine(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );
}

function StudyAnswer({ answer }: { answer: string }) {
  return (
    <div className="mt-4 space-y-2 text-sm leading-7 text-foreground" aria-live="polite">
      {studyAnswerLines(answer).map((line, index) => {
        if (line.kind === "blank") return <div key={index} className="h-1" aria-hidden="true" />;
        return (
          <p
            key={index}
            className={
              line.kind === "bullet" ? "pl-4 before:-ml-4 before:mr-2 before:content-['•']" : ""
            }
          >
            {answerLine(line.text)}
          </p>
        );
      })}
    </div>
  );
}

export function GemmaStudyPanel({
  kind,
  title,
  context,
  contextLimit,
  answerLanguage,
  scopeToPassage = false,
}: GemmaStudyPanelProps) {
  const router = useRouter();
  const inputId = useId();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [retrieval, setRetrieval] = useState<SiteRetrieval | null>(null);
  const actions = studyActions(kind, answerLanguage);
  const copy = studyPanelCopy(answerLanguage);

  useEffect(() => {
    setAnswer("");
    setError("");
    setRetrieval(null);
  }, [title, context, answerLanguage]);

  async function ask(action: StudyAction) {
    const lookup = question.trim();
    const found = lookup && !scopeToPassage ? retrieveSitePages(lookup) : null;
    setRetrieval(found);
    if (found?.shouldOpen && found.best) {
      router.push(found.best.href);
      return;
    }
    const priorAnswer = action === "explain" ? "" : answer;
    const prompt = [
      buildStudyPrompt({
        kind,
        action,
        title,
        context,
        question,
        contextLimit,
        answerLanguage,
        priorAnswer,
      }),
      found ? siteGroundingBlock(found) : "",
    ]
      .filter((part) => part.length > 0)
      .join("\n\n");
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const response = await appFetch("/api/ai/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          mode: "explain",
          audience: "general",
        }),
      });
      if (!response.ok) {
        const failure = await response.json().catch(() => null);
        const message =
          failure && typeof failure.error === "string"
            ? failure.error
            : "Gemma 4 could not answer from this page.";
        throw new Error(message);
      }
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Gemma 4 returned no answer.");
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setAnswer(full);
      }
      if (!full.trim()) throw new Error("Gemma 4 returned an empty answer.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gemma 4 could not answer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="mt-4 rounded-2xl border border-border/70 bg-card p-4"
      aria-label={`Ask Gemma 4 about ${title}`}
      aria-busy={loading}
      data-testid="gemma-study-panel"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <ServerFeatureNotice feature="Gemma 4" />
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Sparkles className="size-4 text-primary" aria-hidden="true" />
        Ask about this section
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy.hint}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            type="button"
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => void ask(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
      <form
        className="mt-3 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          void ask("search");
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Search what you want to understand in {title}
        </label>
        <input
          id={inputId}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={copy.placeholder}
          className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
        />
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Asking…" : "Ask"}
        </Button>
      </form>
      {retrieval ? <SiteRichResults retrieval={retrieval} /> : null}
      {answer ? <StudyAnswer answer={answer} /> : null}
      {error ? (
        <p role="alert" className="mt-3 text-sm text-muted-foreground">
          {error}
        </p>
      ) : null}
    </section>
  );
}
