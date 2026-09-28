import { isHarnessToolName, type ToolCall } from "./types";

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

export function parseToolCall(text: string): ToolCall | null {
  const xml = text.match(/<tool_call>\s*([\s\S]*?)\s*<\/tool_call>/i);
  if (xml?.[1]) {
    try {
      const parsed = JSON.parse(xml[1]) as { name?: string; arguments?: unknown };
      if (parsed.name && isHarnessToolName(parsed.name)) {
        return { name: parsed.name, arguments: asRecord(parsed.arguments) };
      }
    } catch {
      // Fall through to other formats.
    }
  }

  const fenced = text.match(/```(?:json|tool)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      const parsed = JSON.parse(fenced[1]) as { name?: string; arguments?: unknown };
      if (parsed.name && isHarnessToolName(parsed.name)) {
        return { name: parsed.name, arguments: asRecord(parsed.arguments) };
      }
    } catch {
      // Continue.
    }
  }

  const named = text.match(/TOOL:\s*(\w+)\s*\nARGS:\s*(\{[\s\S]*\})/i);
  if (named?.[1] && named[2] && isHarnessToolName(named[1])) {
    try {
      return { name: named[1], arguments: asRecord(JSON.parse(named[2])) };
    } catch {
      return { name: named[1], arguments: {} };
    }
  }

  return null;
}
