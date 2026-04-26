"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Calendar, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const jyotirlingas = [
  {
    id: 1,
    name: "Somnath",
    sanskrit: "सोमनाथ",
    location: "Prabhas Patan, Gujarat",
    story: "The first Jyotirlinga, where Shiva appeared as an infinite column of light to end the dispute between Brahma and Vishnu.",
    significance: "Destroyer of sins, bestower of liberation",
    bestTime: "October-March",
  },
  {
    id: 2,
    name: "Mallikarjuna",
    sanskrit: "मल्लिकार्जुन",
    location: "Srisailam, Andhra Pradesh",
    story: "Shiva and Parvati appeared here to please their son Kartikeya after he was angered by their marriage.",
    significance: "Fulfiller of desires, protector of devotees",
    bestTime: "October-February",
  },
  {
    id: 3,
    name: "Mahakaleshwar",
    sanskrit: "महाकालेश्वर",
    location: "Ujjain, Madhya Pradesh",
    story: "Shiva appeared here to protect his devotee from the demon Dushana, defeating him with the power of time.",
    significance: "Lord of time, conqueror of death",
    bestTime: "October-March",
  },
  {
    id: 4,
    name: "Omkareshwar",
    sanskrit: "ओंकारेश्वर",
    location: "Mandhata, Madhya Pradesh",
    story: "Shiva appeared here in the form of Omkara to bless the mountain Mandhata who performed severe penance.",
    significance: "Fulfiller of wishes, spiritual awakening",
    bestTime: "October-March",
  },
  {
    id: 5,
    name: "Kedarnath",
    sanskrit: "केदारनाथ",
    location: "Uttarakhand",
    story: "After the Mahabharata war, the Pandavas sought Shiva's forgiveness here. Shiva appeared as a bull and dived into the earth.",
    significance: "Liberation from sins, spiritual peace",
    bestTime: "May-June, September-October",
  },
  {
    id: 6,
    name: "Bhimashankar",
    sanskrit: "भीमाशंकर",
    location: "Pune, Maharashtra",
    story: "Shiva appeared here to destroy the demon Bhima, who was tormenting the sages and devotees.",
    significance: "Destroyer of evil, protector of righteousness",
    bestTime: "October-March",
  },
  {
    id: 7,
    name: "Vishwanath",
    sanskrit: "विश्वनाथ",
    location: "Varanasi, Uttar Pradesh",
    story: "The most sacred Jyotirlinga, where Shiva appeared as the Lord of the Universe. Varanasi is considered the spiritual capital of India.",
    significance: "Liberation (moksha), spiritual enlightenment",
    bestTime: "October-March",
  },
  {
    id: 8,
    name: "Trimbakeshwar",
    sanskrit: "त्र्यम्बकेश्वर",
    location: "Nashik, Maharashtra",
    story: "Shiva appeared here to please the sage Gautama, who was falsely accused of killing a cow. The Godavari river originates here.",
    significance: "Purification, fulfillment of desires",
    bestTime: "October-March",
  },
  {
    id: 9,
    name: "Vaidyanath",
    sanskrit: "वैद्यनाथ",
    location: "Deoghar, Jharkhand",
    story: "Shiva appeared here as a doctor (Vaidya) to cure Ravana, who performed severe penance to please him.",
    significance: "Healing, health, and well-being",
    bestTime: "October-March",
  },
  {
    id: 10,
    name: "Nageshwar",
    sanskrit: "नागेश्वर",
    location: "Dwarka, Gujarat",
    story: "Shiva appeared here to protect his devotee Supriya from the demon Daruka, who imprisoned devotees of Shiva.",
    significance: "Protection from enemies, fulfillment of wishes",
    bestTime: "October-March",
  },
  {
    id: 11,
    name: "Rameshwaram",
    sanskrit: "रामेश्वर",
    location: "Rameswaram, Tamil Nadu",
    story: "Rama worshipped Shiva here before crossing the ocean to Lanka. Shiva appeared to bless him and his mission.",
    significance: "Fulfillment of vows, success in endeavors",
    bestTime: "October-March",
  },
  {
    id: 12,
    name: "Grishneshwar",
    sanskrit: "गृष्णेश्वर",
    location: "Ellora, Maharashtra",
    story: "Shiva appeared here to bless the devout Kusuma, who performed severe penance after her husband was killed by her brother-in-law.",
    significance: "Marital harmony, family peace",
    bestTime: "October-March",
  },
];

const shaktiPeethas = [
  {
    id: 1,
    name: "Kamakhya",
    sanskrit: "कामाख्या",
    location: "Guwahati, Assam",
    bodyPart: "Yoni (reproductive organ)",
    story: "Where Sati's yoni fell. The temple represents the cosmic feminine power and is one of the most important Shakta centers.",
    significance: "Desire fulfillment, spiritual power",
    bestTime: "October-March",
  },
  {
    id: 2,
    name: "Kalighat",
    sanskrit: "कालीघाट",
    location: "Kolkata, West Bengal",
    bodyPart: "Right toe",
    story: "Where Sati's right toe fell. The temple is dedicated to Kali, the fierce form of Devi who destroys evil.",
    significance: "Protection from evil, spiritual strength",
    bestTime: "October-March",
  },
  {
    id: 3,
    name: "Vaishno Devi",
    sanskrit: "वैष्णो देवी",
    location: "Jammu & Kashmir",
    bodyPart: "Head",
    story: "Where Sati's head fell. Devi appeared here as Vaishno Devi to bless her devotee Bhairon Nath.",
    significance: "Fulfillment of wishes, spiritual liberation",
    bestTime: "March-July, September-October",
  },
  {
    id: 4,
    name: "Jwalamukhi",
    sanskrit: "ज्वालामुखी",
    location: "Kangra, Himachal Pradesh",
    bodyPart: "Tongue",
    story: "Where Sati's tongue fell. The temple has eternal flames that have been burning for centuries without any fuel.",
    significance: "Knowledge, speech, divine wisdom",
    bestTime: "March-June, September-November",
  },
  {
    id: 5,
    name: "Tara Tarini",
    sanskrit: "तारा तारिणी",
    location: "Berhampur, Odisha",
    bodyPart: "Breasts",
    story: "Where Sati's breasts fell. The temple is dedicated to Tara and Tarini, forms of Devi representing cosmic motherhood.",
    significance: "Motherly protection, nourishment",
    bestTime: "October-March",
  },
];

export function PilgrimageExplorer() {
  const [activeTab, setActiveTab] = useState<"jyotirlingas" | "shakti-peethas">("jyotirlingas");
  const [selectedItem, setSelectedItem] = useState<typeof jyotirlingas[0] | null>(null);

  const activeData = activeTab === "jyotirlingas" ? jyotirlingas : shaktiPeethas;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Tab Navigation */}
      <div className="mb-8 flex gap-3 sm:gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            variant={activeTab === "jyotirlingas" ? "premium" : "outline"}
            onClick={() => setActiveTab("jyotirlingas")}
            className="w-full gap-2 text-sm sm:text-base"
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">12 Jyotirlingas</span>
            <span className="sm:hidden">Jyotirlingas</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            variant={activeTab === "shakti-peethas" ? "premium" : "outline"}
            onClick={() => setActiveTab("shakti-peethas")}
            className="w-full gap-2 text-sm sm:text-base"
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">51 Shakti Peethas</span>
            <span className="sm:hidden">Shakti Peethas</span>
          </Button>
        </motion.div>
      </div>

      {/* Introduction */}
      <div className="mb-12 surface-panel p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {activeTab === "jyotirlingas" ? "The 12 Jyotirlingas" : "The 51 Shakti Peethas"}
        </h2>
        <p className="mt-3 text-sm leading-6 sm:leading-7 text-muted-foreground">
          {activeTab === "jyotirlingas"
            ? "The Jyotirlingas are the 12 sacred abodes of Lord Shiva where He manifested as an infinite column of light (Jyoti). According to tradition, visiting all 12 Jyotirlingas liberates one from the cycle of birth and death. Each Jyotirlinga has unique mythology and significance, representing different aspects of Shiva's divine power."
            : "The Shakti Peethas are 51 sacred sites where parts of Sati's body fell when Lord Shiva performed the Tandava dance carrying her body. These sites are centers of Devi worship and represent the divine feminine power (Shakti). Each Peetha is associated with a specific body part of Sati and has unique mythology and spiritual significance."}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {activeData.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="surface-panel cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="size-5 sm:size-6" />
                </div>
                <span className="rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs font-medium text-primary">
                  #{item.id}
                </span>
              </div>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-foreground">{item.name}</h3>
              <p className="font-devanagari text-base sm:text-lg text-primary">{item.sanskrit}</p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{item.location}</p>
              {activeTab === "shakti-peethas" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Body Part: {(item as typeof shaktiPeethas[0]).bodyPart}
                </p>
              )}
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span className="hidden sm:inline">Best time: {item.bestTime}</span>
                <span className="sm:hidden">{item.bestTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="surface-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">{selectedItem.name}</h2>
                <p className="font-devanagari text-2xl text-primary">{selectedItem.sanskrit}</p>
                <p className="mt-2 text-sm text-muted-foreground">{selectedItem.location}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground">Sacred Story</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedItem.story}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Spiritual Significance</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedItem.significance}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Best Time to Visit</h3>
                <p className="mt-2 text-sm text-muted-foreground">{selectedItem.bestTime}</p>
              </div>

              <Button variant="premium" className="w-full">
                Plan Pilgrimage
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
