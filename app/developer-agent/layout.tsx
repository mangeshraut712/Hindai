import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer agent",
  description:
    "Hind AI Gemma 4 developer agent studio: inspect the SWE tool loop used for the Kaggle submission package.",
};

export default function DeveloperAgentLayout({ children }: { children: ReactNode }) {
  return children;
}
