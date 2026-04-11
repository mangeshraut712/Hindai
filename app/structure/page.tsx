import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TreePine, Scroll, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Structure",
  description: "Understanding the hierarchy and classification of Hindu scriptures.",
};

const categories = [
  {
    name: "Shruti",
    icon: TreePine,
    description: "That which is heard - Divine revelations",
    texts: [
      { name: "Vedas", description: "Rigveda, Samaveda, Yajurveda, Atharvaveda" },
      { name: "Upanishads", description: "Philosophical treatises attached to Vedas" },
    ],
  },
  {
    name: "Smriti",
    icon: Scroll,
    description: "That which is remembered - Human compositions",
    texts: [
      { name: "Itihasas", description: "Ramayana and Mahabharata" },
      { name: "Puranas", description: "Ancient narratives and cosmology" },
      { name: "Dharma Shastras", description: "Law and conduct codes" },
    ],
  },
  {
    name: "Vedangas",
    icon: Scale,
    description: "Limbs of the Vedas - Auxiliary disciplines",
    texts: [
      { name: "Shiksha", description: "Phonetics and pronunciation" },
      { name: "Chandas", description: "Poetic meters" },
      { name: "Vyakarana", description: "Grammar" },
      { name: "Nirukta", description: "Etymology" },
      { name: "Jyotisha", description: "Astronomy and astrology" },
      { name: "Kalpa", description: "Ritual instructions" },
    ],
  },
];

export default function StructurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold">Knowledge Structure</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Hindu scriptures are organized into a hierarchical structure based on their 
              origin, content, and purpose. Understanding this structure helps navigate 
              the vast ocean of ancient Indian wisdom.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.name} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.texts.map((text) => (
                      <li key={text.name} className="flex items-start gap-2">
                        <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{text.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {text.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-lg border bg-muted/50 p-6">
            <h2 className="mb-4 text-xl font-semibold">How to Navigate</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Start with the <strong>Shruti</strong> texts for divine revelations and core philosophy</li>
              <li>• Explore <strong>Smriti</strong> for stories, ethics, and practical guidance</li>
              <li>• Reference <strong>Vedangas</strong> for understanding the technical aspects of the Vedas</li>
              <li>• Each category builds upon the others to create a complete spiritual framework</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
