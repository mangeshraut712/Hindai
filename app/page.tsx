import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Hind AI - AI-Powered Digital Library of Ancient Indian Scriptures",
  description:
    "Discover ancient Indian wisdom through AI-powered exploration. A modern digital library for Vedas, Upanishads, Epics, and Puranas with intelligent insights.",
  openGraph: {
    title: "Hind AI - AI-Powered Digital Library",
    description:
      "Discover ancient Indian wisdom through AI-powered exploration.",
    url: "https://hindai.dev",
  },
};

export default function Page() {
  return <HomePage />;
}
