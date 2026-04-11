import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library Contents",
  description: "Browse all ancient Indian scriptures available on Hind AI.",
};

const scriptures = [
  {
    category: "Vedas",
    items: [
      { name: "Rigveda", href: "/rigveda", description: "The oldest sacred text of Hinduism" },
    ],
  },
  {
    category: "Epics",
    items: [
      { name: "Mahabharata", href: "/mahabharata", description: "The great Indian epic" },
      { name: "Ramayana", href: "/ramayana", description: "The journey of Lord Rama" },
      { name: "Bhagavad Gita", href: "/bhagavad-gita", description: "The Song of God" },
    ],
  },
  {
    category: "Puranas",
    items: [
      { name: "Srimad Bhagavatam", href: "/srimad-bhagavatam", description: "Stories of Lord Krishna" },
      { name: "Markandeya Purana", href: "/markandeya-purana", description: "Including Devi Mahatmyam" },
      { name: "Devi Mahatmyam", href: "/devi-mahatmyam", description: "Glory of the Divine Mother" },
    ],
  },
  {
    category: "Dharma Shastras",
    items: [
      { name: "Manu Smriti", href: "/manu-smriti", description: "Ancient legal and moral codes" },
      { name: "Parashara Smriti", href: "/parashara", description: "Vedic guidance for daily life" },
    ],
  },
  {
    category: "Philosophy",
    items: [
      { name: "Yoga Vasishtha", href: "/yoga-vasishtha", description: "Spiritual instruction of Lord Rama" },
    ],
  },
];

export default function ContentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Library Contents</h1>
            <p className="mt-2 text-muted-foreground">
              Browse all available ancient Indian scriptures
            </p>
          </div>

          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search scriptures..."
              className="pl-10"
            />
          </div>

          <div className="space-y-8">
            {scriptures.map((section) => (
              <section key={section.category}>
                <h2 className="mb-4 text-xl font-semibold">{section.category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
