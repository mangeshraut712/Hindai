// Test file for CommentaryBySchool component
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentaryBySchool from "../CommentaryBySchool";
import { Commentary, VedantaSchool } from "@/lib/database/schema";

describe("CommentaryBySchool", () => {
  const mockCommentaries: Commentary[] = [
    {
      id: "commentary-1",
      verse_id: "verse-1",
      school: "advaita" as VedantaSchool,
      acharya: "Adi Shankara",
      text_sa: "अहं ब्रह्मास्मि",
      text_en: "I am Brahman",
      source: "Shankara Bhashya",
      century: "8th century CE",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "commentary-2",
      verse_id: "verse-1",
      school: "vishishtadvaita" as VedantaSchool,
      acharya: "Ramanuja",
      text_sa: "अहं ब्रह्मास्मि",
      text_en: "I am part of Brahman",
      source: "Sri Bhashya",
      century: "11th century CE",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  it("should render component without crashing", () => {
    render(<CommentaryBySchool commentaries={mockCommentaries} />);
    expect(screen.getByText("Commentary by School")).toBeDefined();
  });

  it("should display available schools as tabs", () => {
    render(<CommentaryBySchool commentaries={mockCommentaries} />);
    expect(screen.getByText("Adi Shankara")).toBeDefined();
    expect(screen.getByText("Ramanuja")).toBeDefined();
  });

  it("should display compare checkbox", () => {
    render(<CommentaryBySchool commentaries={mockCommentaries} />);
    expect(screen.getByText("Compare all schools")).toBeDefined();
  });

  it("should handle empty commentaries", () => {
    render(<CommentaryBySchool commentaries={[]} />);
    expect(screen.getByText(/No commentaries available/)).toBeDefined();
  });
});
