"use client";

import { useState } from "react";
import { Commentary, VedantaSchool } from "@/lib/database/schema";

interface CommentaryBySchoolProps {
  commentaries: Commentary[];
  verseText?: string;
}

interface SchoolSummary {
  school: VedantaSchool;
  acharya: string;
  summary: string;
  keyTeachings: string[];
}

const SCHOOL_SUMMARIES: Record<VedantaSchool, SchoolSummary> = {
  advaita: {
    school: "advaita",
    acharya: "Adi Shankara",
    summary: "Non-dualism - Brahman is the only reality, the world is illusion (Maya)",
    keyTeachings: [
      "Brahman is Sat-Chit-Ananda (Existence-Consciousness-Bliss)",
      "Atman (soul) is identical to Brahman",
      "The world is Maya (illusion) superimposed on Brahman",
      "Liberation (Moksha) is realizing this identity",
    ],
  },
  vishishtadvaita: {
    school: "vishishtadvaita",
    acharya: "Ramanuja",
    summary: "Qualified non-dualism - The soul is part of Brahman but not identical",
    keyTeachings: [
      "Brahman is the Supreme Person (Narayana)",
      "Souls (Jivas) are eternal parts of Brahman",
      "The world is real transformation of Brahman",
      "Liberation is eternal service to Brahman",
    ],
  },
  dvaita: {
    school: "dvaita",
    acharya: "Madhva",
    summary: "Dualism - Brahman, souls, and matter are eternally distinct",
    keyTeachings: [
      "Brahman (Vishnu) is eternally distinct from souls",
      "Souls are dependent servants of Brahman",
      "The world is real and eternal",
      "Liberation is eternal bliss in service to Vishnu",
    ],
  },
  shuddhadvaita: {
    school: "shuddhadvaita",
    acharya: "Vallabha",
    summary: "Pure non-dualism - Everything is Krishna's divine play (Lila)",
    keyTeachings: [
      "Krishna is the only reality",
      "The world is Krishna's Lila (divine play)",
      "The soul is a part (ansh) of Krishna",
      "Liberation is eternal loving devotion (Pushti)",
    ],
  },
  dvaitadvaita: {
    school: "dvaitadvaita",
    acharya: "Nimbarka",
    summary: "Dualism in non-dualism - Simultaneously different and non-different",
    keyTeachings: [
      "Brahman and souls are simultaneously different and non-different",
      "The world is a manifestation of Brahman",
      "Radha-Krishna are the ultimate reality",
      "Liberation is eternal loving devotion",
    ],
  },
  "achintya-bhedabheda": {
    school: "achintya-bhedabheda",
    acharya: "Chaitanya Mahaprabhu",
    summary: "Inconceivable difference and non-difference",
    keyTeachings: [
      "The relationship between Krishna and souls is inconceivable",
      "Souls are simultaneously one with and different from Krishna",
      "The world is Krishna's energy",
      "Liberation is loving devotion (Bhakti)",
    ],
  },
  general: {
    school: "general",
    acharya: "Various",
    summary: "General commentary without specific school affiliation",
    keyTeachings: [],
  },
};

export default function CommentaryBySchool({ commentaries, verseText }: CommentaryBySchoolProps) {
  const [selectedSchool, setSelectedSchool] = useState<VedantaSchool | null>(null);
  const [compareMode, setCompareMode] = useState(false);

  // Group commentaries by school
  const groupedCommentaries = commentaries.reduce(
    (acc, commentary) => {
      if (!acc[commentary.school]) {
        acc[commentary.school] = [];
      }
      acc[commentary.school].push(commentary);
      return acc;
    },
    {} as Record<VedantaSchool, Commentary[]>
  );

  const availableSchools = Object.keys(groupedCommentaries) as VedantaSchool[];

  if (availableSchools.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-gray-600">No commentaries available for this verse</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Commentary by School</h2>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={compareMode}
            onChange={(e) => setCompareMode(e.target.checked)}
            className="h-5 w-5"
          />
          <span className="font-medium">Compare all schools</span>
        </label>
      </div>

      {/* School selection tabs */}
      {!compareMode && (
        <div className="flex flex-wrap gap-2 border-b">
          {availableSchools.map((school) => (
            <button
              key={school}
              onClick={() => setSelectedSchool(school)}
              className={`px-4 py-2 font-medium transition ${
                selectedSchool === school
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {SCHOOL_SUMMARIES[school].acharya}
            </button>
          ))}
        </div>
      )}

      {/* School summary */}
      {!compareMode && selectedSchool && (
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <h3 className="mb-2 font-bold">{SCHOOL_SUMMARIES[selectedSchool].acharya}</h3>
          <p className="mb-3 text-gray-700">{SCHOOL_SUMMARIES[selectedSchool].summary}</p>
          {SCHOOL_SUMMARIES[selectedSchool].keyTeachings.length > 0 && (
            <div>
              <h4 className="mb-1 font-semibold">Key Teachings:</h4>
              <ul className="list-inside list-disc text-sm text-gray-600">
                {SCHOOL_SUMMARIES[selectedSchool].keyTeachings.map((teaching, index) => (
                  <li key={index}>{teaching}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Commentaries display */}
      {compareMode ? (
        // Compare mode: show all schools side by side
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableSchools.map((school) => (
            <div key={school} className="overflow-hidden rounded-lg border">
              <div className="border-b bg-gray-100 p-3">
                <h3 className="font-bold">{SCHOOL_SUMMARIES[school].acharya}</h3>
                <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                  {school}
                </span>
              </div>
              <div className="space-y-3 p-4">
                {groupedCommentaries[school].map((commentary) => (
                  <div key={commentary.id} className="text-sm">
                    {commentary.text_sa && (
                      <p className="mb-2 italic text-gray-700">{commentary.text_sa}</p>
                    )}
                    <p className="text-gray-800">{commentary.text_en}</p>
                    {commentary.century && (
                      <p className="mt-1 text-xs text-gray-500">{commentary.century}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Single school mode
        selectedSchool && (
          <div className="space-y-4">
            {groupedCommentaries[selectedSchool].map((commentary) => (
              <div key={commentary.id} className="rounded-lg border bg-white p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{commentary.acharya}</h3>
                    {commentary.century && (
                      <p className="text-sm text-gray-500">{commentary.century}</p>
                    )}
                  </div>
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                    {commentary.school}
                  </span>
                </div>
                {commentary.text_sa && (
                  <div className="mb-3 rounded-lg bg-amber-50 p-3">
                    <p className="italic text-gray-700">{commentary.text_sa}</p>
                  </div>
                )}
                <p className="text-gray-800">{commentary.text_en}</p>
                <p className="mt-2 text-sm text-gray-500">Source: {commentary.source}</p>
              </div>
            ))}
          </div>
        )
      )}

      {/* Verse context */}
      {verseText && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="mb-2 font-bold">Verse Context</h3>
          <p className="text-lg">{verseText}</p>
        </div>
      )}

      {/* Metaphysical comparison */}
      {availableSchools.length > 1 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-3 font-bold">Metaphysical Differences</h3>
          <div className="space-y-3">
            {availableSchools.map((school) => (
              <div key={school} className="flex items-start gap-3">
                <span className="font-medium">{SCHOOL_SUMMARIES[school].acharya}:</span>
                <span className="text-sm text-gray-700">{SCHOOL_SUMMARIES[school].summary}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
