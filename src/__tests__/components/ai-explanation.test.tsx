/**
 * Component Tests for AI Explanation
 *
 * Tests React component behavior, loading states, error handling
 */

import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AIExplanation } from "@/components/ai/ai-explanation";

describe("AIExplanation Component", () => {
  const defaultProps = {
    verseId: "bg-2-47",
    sanskrit: "कर्मण्येवाधिकारस्ते",
    translation: "You have a right to perform your duty",
    scripture: "bhagavad-gita",
    chapter: 2,
    verse: 47,
  };

  beforeEach(() => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        response: {
          explanation: "This is a test explanation",
          context: "Test context",
          keyTerms: [],
          references: [],
        },
        cached: false,
        rateLimit: { remaining: 9, reset: Date.now() + 60000 },
      }),
    } as Response);
  });

  it("renders the get explanation button initially", () => {
    render(<AIExplanation {...defaultProps} />);

    expect(screen.getByText("Get AI Explanation")).toBeInTheDocument();
  });

  it("shows loading state when clicked", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.mocked(global.fetch).mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }) as Promise<Response>
    );

    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    expect(screen.getByText(/Generating with/)).toBeInTheDocument();

    resolveFetch({
      ok: true,
      json: async () => ({
        response: {
          explanation: "This is a test explanation",
        },
      }),
    } as Response);

    await waitFor(() => {
      expect(screen.getByText("AI-Powered Study Pack")).toBeInTheDocument();
    });
  });

  it("displays explanation after successful generation", async () => {
    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(screen.getByText("AI-Powered Study Pack")).toBeInTheDocument();
    });

    expect(screen.getByText("This is a test explanation")).toBeInTheDocument();
  });

  it("shows error message when generation fails", async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("API Error"));

    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(screen.getByText(/Failed to generate explanation/)).toBeInTheDocument();
    });
  });

  it("allows regenerating explanation", async () => {
    render(<AIExplanation {...defaultProps} />);

    // Generate first explanation
    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(screen.getByText("AI-Powered Study Pack")).toBeInTheDocument();
    });

    // Click regenerate
    fireEvent.click(screen.getByText("Generate Another Study Pack"));

    expect(screen.getByText("Get AI Explanation")).toBeInTheDocument();
  });
});
