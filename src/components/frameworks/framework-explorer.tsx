"use client";

import { useState } from "react";
import { Target, Layers, Users, Heart, Shield, Eye, BookOpen, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FrameworkItem {
  id: string;
  name: string;
  sanskrit: string;
  icon: React.ReactNode;
  description: string;
  elements: Array<{
    name: string;
    sanskrit: string;
    description: string;
    color: string;
  }>;
  significance: string;
  relatedTexts?: string[];
}

const frameworks: FrameworkItem[] = [
  {
    id: "purushartha",
    name: "Purushartha",
    sanskrit: "पुरुषार्थ",
    icon: <Target className="size-6" />,
    description:
      "The four aims or purposes of human life that guide ethical and spiritual development.",
    elements: [
      {
        name: "Dharma",
        sanskrit: "धर्म",
        description: "Righteous duty, moral order, and cosmic law",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Artha",
        sanskrit: "अर्थ",
        description: "Prosperity, wealth, and material well-being",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Kama",
        sanskrit: "काम",
        description: "Pleasure, desire, and emotional fulfillment",
        color: "bg-red-100 text-red-800",
      },
      {
        name: "Moksha",
        sanskrit: "मोक्ष",
        description: "Liberation from the cycle of birth and death",
        color: "bg-purple-100 text-purple-800",
      },
    ],
    significance:
      "Purushartha provides the ethical foundation for Hindu life, balancing material and spiritual goals.",
    relatedTexts: ["Manu Smriti", "Mahabharata", "Yoga Sutras"],
  },
  {
    id: "pancha-kosha",
    name: "Pancha Kosha",
    sanskrit: "पञ्च कोश",
    icon: <Layers className="size-6" />,
    description:
      "The five layers or sheaths of the human being, from gross physical to subtle spiritual.",
    elements: [
      {
        name: "Annamaya Kosha",
        sanskrit: "अन्नमय कोश",
        description: "Physical body made of food and matter",
        color: "bg-orange-100 text-orange-800",
      },
      {
        name: "Pranamaya Kosha",
        sanskrit: "प्राणमय कोश",
        description: "Vital energy body, breath and life force",
        color: "bg-red-100 text-red-800",
      },
      {
        name: "Manomaya Kosha",
        sanskrit: "मनोमय कोश",
        description: "Mental body, mind and emotions",
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Vijnanamaya Kosha",
        sanskrit: "विज्ञानमय कोश",
        description: "Wisdom body, intellect and discrimination",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Anandamaya Kosha",
        sanskrit: "आनन्दमय कोश",
        description: "Bliss body, pure consciousness and joy",
        color: "bg-purple-100 text-purple-800",
      },
    ],
    significance:
      "Understanding the koshas helps in holistic spiritual development and self-realization.",
    relatedTexts: ["Taittiriya Upanishad", "Yoga texts"],
  },
  {
    id: "ashtanga-yoga",
    name: "Ashtanga Yoga",
    sanskrit: "अष्टाङ्ग योग",
    icon: <Users className="size-6" />,
    description:
      "Patanjali's eight-fold path of yoga for achieving enlightenment and self-realization.",
    elements: [
      {
        name: "Yama",
        sanskrit: "यम",
        description: "Ethical restraints and moral discipline",
        color: "bg-red-100 text-red-800",
      },
      {
        name: "Niyama",
        sanskrit: "नियम",
        description: "Personal observances and spiritual practices",
        color: "bg-orange-100 text-orange-800",
      },
      {
        name: "Asana",
        sanskrit: "आसन",
        description: "Physical postures for health and stability",
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Pranayama",
        sanskrit: "प्राणायाम",
        description: "Breath control and energy regulation",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Pratyahara",
        sanskrit: "प्रत्याहार",
        description: "Withdrawal of senses from external objects",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Dharana",
        sanskrit: "धारणा",
        description: "Concentration and focused attention",
        color: "bg-indigo-100 text-indigo-800",
      },
      {
        name: "Dhyana",
        sanskrit: "ध्यान",
        description: "Meditation and contemplative absorption",
        color: "bg-purple-100 text-purple-800",
      },
      {
        name: "Samadhi",
        sanskrit: "समाधि",
        description: "Enlightenment and union with the divine",
        color: "bg-pink-100 text-pink-800",
      },
    ],
    significance:
      "Ashtanga Yoga provides a systematic path for spiritual evolution and self-mastery.",
    relatedTexts: ["Yoga Sutras of Patanjali"],
  },
  {
    id: "ashrama-dharma",
    name: "Ashrama Dharma",
    sanskrit: "आश्रम धर्म",
    icon: <TreePine className="size-6" />,
    description:
      "The four stages of life that guide spiritual and social development through different life phases.",
    elements: [
      {
        name: "Brahmacharya",
        sanskrit: "ब्रह्मचर्य",
        description: "Student stage focused on learning and celibacy",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Grihastha",
        sanskrit: "गृहस्थ",
        description: "Householder stage of family life and responsibility",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Vanaprastha",
        sanskrit: "वानप्रस्थ",
        description: "Retirement stage of detachment and spiritual practice",
        color: "bg-orange-100 text-orange-800",
      },
      {
        name: "Sannyasa",
        sanskrit: "सन्न्यास",
        description: "Renunciate stage of complete spiritual liberation",
        color: "bg-purple-100 text-purple-800",
      },
    ],
    significance: "Ashrama Dharma structures life to balance worldly duties with spiritual growth.",
    relatedTexts: ["Dharmashastras", "Manusmriti"],
  },
  {
    id: "shad-ripu",
    name: "Shad Ripu",
    sanskrit: "षड्रिपु",
    icon: <Shield className="size-6" />,
    description: "The six enemies of the mind that must be overcome for spiritual progress.",
    elements: [
      {
        name: "Kama",
        sanskrit: "काम",
        description: "Lust and desire for sensual pleasure",
        color: "bg-red-100 text-red-800",
      },
      {
        name: "Krodha",
        sanskrit: "क्रोध",
        description: "Anger and destructive rage",
        color: "bg-orange-100 text-orange-800",
      },
      {
        name: "Lobha",
        sanskrit: "लोभ",
        description: "Greed and avarice",
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Moha",
        sanskrit: "मोह",
        description: "Delusion and attachment",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Mada",
        sanskrit: "मद",
        description: "Pride and arrogance",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Matsarya",
        sanskrit: "मत्सर्य",
        description: "Jealousy and envy",
        color: "bg-purple-100 text-purple-800",
      },
    ],
    significance: "Conquering the Shad Ripu leads to mental purity and spiritual advancement.",
    relatedTexts: ["Yoga texts", "Bhagavad Gita"],
  },
  {
    id: "navavidha-bhakti",
    name: "Navavidha Bhakti",
    sanskrit: "नवविध भक्ति",
    icon: <Heart className="size-6" />,
    description: "The nine forms of devotion that express love and surrender to the divine.",
    elements: [
      {
        name: "Shravana",
        sanskrit: "श्रवण",
        description: "Hearing about God's glories",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Kirtana",
        sanskrit: "कीर्तन",
        description: "Singing praises of God",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Smaraṇa",
        sanskrit: "स्मरण",
        description: "Remembering God constantly",
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Padasevana",
        sanskrit: "पादसेवन",
        description: "Serving God's feet (service)",
        color: "bg-orange-100 text-orange-800",
      },
      {
        name: "Archana",
        sanskrit: "अर्चन",
        description: "Worshipping God with rituals",
        color: "bg-red-100 text-red-800",
      },
      {
        name: "Vandana",
        sanskrit: "वन्दन",
        description: "Prostrating before God",
        color: "bg-purple-100 text-purple-800",
      },
      {
        name: "Dasya",
        sanskrit: "दास्य",
        description: "Serving God as a servant",
        color: "bg-pink-100 text-pink-800",
      },
      {
        name: "Sakhyatva",
        sanskrit: "सख्यत्व",
        description: "Treating God as a friend",
        color: "bg-indigo-100 text-indigo-800",
      },
      {
        name: "Atmanivedana",
        sanskrit: "आत्मनिवेदन",
        description: "Complete self-surrender to God",
        color: "bg-teal-100 text-teal-800",
      },
    ],
    significance:
      "Navavidha Bhakti offers multiple paths for devotees to connect with the divine according to their nature.",
    relatedTexts: ["Bhagavad Gita", "Bhakti literature"],
  },
];

export function FrameworkExplorer() {
  const [selectedFramework, setSelectedFramework] = useState<FrameworkItem | null>(null);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Core Hindu Frameworks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                These foundational frameworks provide the conceptual architecture for Hindu
                philosophy, ethics, and spiritual practice. They offer systematic approaches to
                understanding human nature, purpose, and the path to liberation.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {frameworks.map((framework) => (
                  <Card
                    key={framework.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFramework?.id === framework.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedFramework(framework)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{framework.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{framework.name}</CardTitle>
                          <p className="font-devanagari text-sm text-primary">
                            {framework.sanskrit}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">{framework.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {framework.elements.slice(0, 3).map((element, index) => (
                          <span
                            key={index}
                            className={`rounded px-2 py-1 text-xs ${element.color}`}
                          >
                            {element.name}
                          </span>
                        ))}
                        {framework.elements.length > 3 && (
                          <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                            +{framework.elements.length - 3} more
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed View */}
          {selectedFramework && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-primary">{selectedFramework.icon}</div>
                  <div>
                    <CardTitle className="text-2xl">{selectedFramework.name}</CardTitle>
                    <p className="font-devanagari text-lg text-primary">
                      {selectedFramework.sanskrit}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedFramework.description}
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Elements</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedFramework.elements.map((element, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-border/60 bg-background/50 p-4"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium ${element.color}`}
                          >
                            {index + 1}
                          </span>
                          <h4 className="font-semibold">{element.name}</h4>
                        </div>
                        <p className="mb-1 font-devanagari text-sm text-primary">
                          {element.sanskrit}
                        </p>
                        <p className="text-sm text-muted-foreground">{element.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Significance</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedFramework.significance}
                  </p>
                </div>

                {selectedFramework.relatedTexts && selectedFramework.relatedTexts.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Related Texts</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFramework.relatedTexts.map((text, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Integration View */}
          <Card>
            <CardHeader>
              <CardTitle>How Frameworks Interconnect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-semibold">Life Journey Integration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="min-w-[100px] font-medium text-blue-600">Brahmacharya:</span>
                      <span>Focus on Dharma through learning</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[100px] font-medium text-green-600">Grihastha:</span>
                      <span>Balance Dharma, Artha, Kama</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[100px] font-medium text-orange-600">
                        Vanaprastha:
                      </span>
                      <span>Practice Ashtanga Yoga deeply</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[100px] font-medium text-purple-600">Sannyasa:</span>
                      <span>Pursue Moksha through meditation</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold">Spiritual Evolution</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="min-w-[120px] font-medium text-orange-600">Annamaya:</span>
                      <span>Asana & Yama discipline</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[120px] font-medium text-red-600">Pranamaya:</span>
                      <span>Pranayama practice</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[120px] font-medium text-yellow-600">Manomaya:</span>
                      <span>Dharana & Dhyana</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="min-w-[120px] font-medium text-purple-600">
                        Higher stages:
                      </span>
                      <span>Samadhi & Moksha</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
