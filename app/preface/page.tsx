import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BookOpen, Heart, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Preface",
  description: "Welcome to Hind AI - Your guide to exploring ancient Indian scriptures.",
};

export default function PrefacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold">Welcome to Hind AI</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your companion in exploring the timeless wisdom of ancient India
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Hind AI is more than just a digital library—it is a bridge between the ancient wisdom
              of India and the modern seeker. Our mission is to preserve, present, and make
              accessible the vast ocean of spiritual and philosophical literature that has guided
              humanity for thousands of years.
            </p>

            <div className="mt-10 rounded-lg border-l-4 border-primary bg-muted/50 p-6">
              <h2 className="text-xl font-semibold">How Hindu scripture is organized</h2>
              <p className="mt-3 text-muted-foreground">
                Hinduism does not have a fixed number of scriptures. Its literature grew across
                thousands of years and is broadly classified into two streams:
                <strong> Shruti</strong>, the revealed foundation, and <strong>Smriti</strong>, the
                remembered and transmitted tradition.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  • <strong>Shruti</strong>: the 4 Vedas, including their Samhitas, Brahmanas,
                  Aranyakas, and Upanishads.
                </li>
                <li>
                  • <strong>Smriti</strong>: the 18 Mahapuranas, 18 Upa-Puranas, the 2 Itihasas, and
                  the wider worlds of Shastras and Sutras.
                </li>
                <li>
                  • <strong>Bhagavad Gita</strong>: part of the Mahabharata, but widely revered as
                  an independent spiritual guide.
                </li>
              </ul>
            </div>

            <h2 className="mt-8 text-2xl font-semibold">What You&apos;ll Find Here</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle className="mt-2">Sacred Texts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access the Vedas, Epics, Puranas, and philosophical treatises with accurate
                    translations and transliterations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="mt-2">AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get contextual explanations and discover connections between different texts
                    through intelligent analysis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-6 w-6 text-primary" />
                  <CardTitle className="mt-2">Spiritual Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Find practical wisdom for daily life from the timeless teachings of the sages
                    and enlightened beings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <CardTitle className="mt-2">Knowledge Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Understand Shruti, Smriti, Vedas, Upanishads, Puranas, and Itihasa as an
                    interconnected knowledge map.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="mt-12 text-2xl font-semibold">How to Begin</h2>

            <div className="mt-4 space-y-4">
              <p>
                <strong>1. Explore the Library</strong> — Browse through our collection of
                scriptures. Each text includes a brief introduction to help you understand its
                significance and context.
              </p>

              <p>
                <strong>2. Understand the Structure</strong> — Visit the
                <Link href="/structure/" className="text-primary hover:underline">
                  {" "}
                  Structure{" "}
                </Link>
                page to learn how the tradition branches into Shruti, Smriti, Vedangas, epics,
                Puranas, and the philosophical texts that sit behind them.
              </p>

              <p>
                <strong>3. Use AI Features</strong> — Ask questions about verses, request
                explanations of complex concepts, or explore thematic connections across different
                texts.
              </p>

              <p>
                <strong>4. Deep Dive</strong> — Start with texts that resonate with you. Whether
                it&apos;s the Bhagavad Gita&apos;s practical wisdom, the Upanishads&apos;
                philosophical depth, or the Ramayana&apos;s timeless story—follow your curiosity.
              </p>
            </div>

            <div className="mt-12 rounded-lg border-l-4 border-primary bg-muted/50 p-6">
              <h3 className="text-lg font-semibold">A Note on Interpretation</h3>
              <p className="mt-2 text-muted-foreground">
                These ancient texts have been interpreted in countless ways over millennia. Hind AI
                presents multiple perspectives and encourages you to contemplate the teachings and
                find what resonates with your own understanding. The goal is not to provide
                definitive answers, but to facilitate your own exploration of these profound wisdom
                traditions.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                May your journey through these sacred texts bring wisdom, peace, and enlightenment.
              </p>
              <p className="mt-2 font-serif text-lg text-primary">ॐ शान्तिः शान्तिः शान्तिः</p>
              <p className="text-sm text-muted-foreground">Om Shanti Shanti Shanti</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
