/**
 * Component Tests for AI Explanation
 * 
 * Tests React component behavior, loading states, error handling
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AIExplanation } from "@/components/ai/ai-explanation";

// Mock the AI library
vi.mock("@/lib/ai/gemini", () => ({
  generateExplanation: vi.fn().mockResolvedValue({
    response: {
      explanation: "This is a test explanation",
      context: "Test context",
      keyTerms: [],
      references: [],
    },
    cached: false,
    rateLimit: { remaining: 9, reset: Date.now() + 60000 },
  }),
}));

describe("AIExplanation Component", () => {
  const defaultProps = {
    verseId: "bg-2-47",
    sanskrit: "कर्मण्येवाधिकारस्ते",
    translation: "You have a right to perform your duty",
    scripture: "bhagavad-gita",
    chapter: 2,
    verse: 47,
  };

  it("renders the get explanation button initially", () => {
    render(<AIExplanation {...defaultProps} />);

    expect(screen.getByText("Get AI Explanation")).toBeInTheDocument();
  });

  it("shows loading state when clicked", async () => {
    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    expect(screen.getByText("Generating with Gemini...")).toBeInTheDocument();
  });

  it("displays explanation after successful generation", async () => {
    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(screen.getByText("AI-Powered Explanation")).toBeInTheDocument();
    });

    expect(
      screen.getByText("This is a test explanation")
    ).toBeInTheDocument();
  });

  it("shows error message when generation fails", async () => {
    const { generateExplanation } = await import("@/lib/ai/gemini");
    vi.mocked(generateExplanation).mockRejectedValueOnce(
      new Error("API Error")
    );

    render(<AIExplanation {...defaultProps} />);

    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to generate explanation/)
      ).toBeInTheDocument();
    });
  });

  it("allows regenerating explanation", async () => {
    render(<AIExplanation {...defaultProps} />);

    // Generate first explanation
    fireEvent.click(screen.getByText("Get AI Explanation"));

    await waitFor(() => {
      expect(screen.getByText("AI-Powered Explanation")).toBeInTheDocument();
    });

    // Click regenerate
    fireEvent.click(screen.getByText("Get Another Explanation"));

    expect(screen.getByText("Get AI Explanation")).toBeInTheDocument();
  });
});
