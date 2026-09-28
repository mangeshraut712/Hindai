"use client";

import { useState } from "react";
import { Loader2, Play, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ServerFeatureNotice } from "@/components/ai/server-feature-notice";
import { appFetch } from "@/lib/runtime/app-fetch";
import { ZERO_LIMIT_ISSUE } from "@/lib/agent/fixtures";
import type { AgentRunResult } from "@/lib/agent/types";

type AgentResponse = AgentRunResult & {
  issue?: string;
  note?: string;
  error?: string;
  demoWorkspace?: string;
};

export function DeveloperAgentStudio() {
  const [issue, setIssue] = useState(ZERO_LIMIT_ISSUE);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AgentResponse | null>(null);

  const run = async () => {
    if (!issue.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);
    try {
      const response = await appFetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue: issue.trim(), demo: true }),
      });
      const payload = (await response.json()) as AgentResponse;
      if (!response.ok) {
        throw new Error(payload.error || "Agent request failed");
      }
      setResult(payload);
    } catch (error) {
      setResult({
        backend: "mock",
        model: "none",
        submitted: false,
        patch: "",
        steps: [],
        finalMessage: error instanceof Error ? error.message : "Agent request failed",
        stoppedReason: "error",
        error: error instanceof Error ? error.message : "Agent request failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="developer-agent-studio">
      <ServerFeatureNotice feature="Developer agent" />
      <div className="surface-panel p-6">
        <label htmlFor="agent-issue" className="text-sm font-medium text-foreground">
          Issue
        </label>
        <Textarea
          id="agent-issue"
          className="mt-3 min-h-32"
          value={issue}
          onChange={(event) => setIssue(event.target.value)}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={() => void run()} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Play className="mr-2 size-4" />
            )}
            Run on demo workspace
          </Button>
          <p className="self-center text-xs text-muted-foreground">
            In-memory Python fixture. No host shell. Default backend is mock unless OpenRouter or
            Ollama is configured.
          </p>
        </div>
      </div>

      {result ? (
        <div className="space-y-4" data-testid="developer-agent-result">
          <div className="surface-panel p-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">Result</p>
            <p className="mt-2 text-sm text-foreground">
              backend={result.backend} · model={result.model} · submitted=
              {String(result.submitted)} · stop={result.stoppedReason}
            </p>
            {result.note ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{result.note}</p>
            ) : null}
            {result.error ? <p className="mt-3 text-sm text-destructive">{result.error}</p> : null}
          </div>
          <ol className="space-y-3">
            {result.steps.map((step, index) => (
              <li key={`${step.call?.name}-${index}`} className="surface-panel p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Wrench className="size-4 text-primary" />
                  {index + 1}. {step.call?.name ?? "stop"}
                </p>
                <pre className="mt-2 overflow-x-auto text-xs leading-5 text-muted-foreground">
                  {step.observation?.output || step.thought}
                </pre>
              </li>
            ))}
          </ol>
          {result.patch ? (
            <pre
              className="surface-panel overflow-x-auto p-4 text-xs leading-5"
              data-testid="developer-agent-patch"
            >
              {result.patch}
            </pre>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
