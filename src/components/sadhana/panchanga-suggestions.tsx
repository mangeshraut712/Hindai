"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Clock, Sparkles, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PanchangaCalculator } from "@/lib/panchanga/calculator";
import { Panchanga } from "@/lib/panchanga/types";
import { trackEvent } from "@/lib/analytics";

type Recommendation = {
  deity: string;
  mantraId: string;
  mantraName: string;
  practice: string;
  reason: string;
};

export function PanchangaSuggestions() {
  const [panchanga, setPanchanga] = useState<Panchanga | null>(null);
  const [rec, setRec] = useState<Recommendation | null>(null);

  useEffect(() => {
    const todayData = PanchangaCalculator.getToday();
    setPanchanga(todayData);

    // Generate recommendation based on Vara and Tithi
    const recommendation = getRecommendation(
      todayData.vara,
      todayData.tithi.number,
      todayData.tithi.name
    );
    setRec(recommendation);
  }, []);

  const getRecommendation = (vara: string, tithiNum: number, tithiName: string): Recommendation => {
    // 1. Check special Tithis first
    if (tithiNum === 11) {
      return {
        deity: "Lord Vishnu",
        mantraId: "hare-krishna",
        mantraName: "Hare Krishna Mahamantra",
        practice: "Upavasa (Fasting) & Vishnu Nama Japa",
        reason:
          "Today is Ekadashi, the sacred 11th lunar day dedicated to Lord Vishnu. Fasting and chanting on this day clears karmic blockages and heightens devotion.",
      };
    }

    if (tithiNum === 13) {
      return {
        deity: "Lord Shiva",
        mantraId: "om-namah-shivaya",
        mantraName: "Om Namah Shivaya",
        practice: "Pradosha Vrat & Rudra Dhyana",
        reason:
          "Today is Trayodashi, associated with Pradosham. Chanting Shiva mantras during twilight brings mental peace and dissolves negative influences.",
      };
    }

    if (tithiNum === 4) {
      return {
        deity: "Lord Ganesha",
        mantraId: "gayatri",
        mantraName: "Gayatri Mantra",
        practice: "Ganesha Gajanana Japa & Vignaharta Puja",
        reason:
          "Today is Chaturthi, auspicious for Lord Ganesha. Seek his blessings to remove all obstacles from your spiritual and daily endeavors.",
      };
    }

    if (tithiName === "Purnima") {
      return {
        deity: "Cosmic Consciousness / Sun God",
        mantraId: "gayatri",
        mantraName: "Gayatri Mantra",
        practice: "Purnima Meditation & Gayatri Sadhana",
        reason:
          "Today is the Full Moon (Purnima). The lunar energies are at their peak, making it the most powerful day for silent meditation and Gayatri mantra recitation.",
      };
    }

    if (tithiName === "Amavasya") {
      return {
        deity: "Lord Shiva / Ancestors",
        mantraId: "mahamrityunjaya",
        mantraName: "Mahamrityunjaya Mantra",
        practice: "Pitru Tarpan & Mahamrityunjaya Chanting",
        reason:
          "Today is the New Moon (Amavasya). A day for inner introspection, ancestor remembrance, and chanting for health, protection, and mental resilience.",
      };
    }

    // 2. Fall back to Vara (Weekday) calculations
    const v = vara.toLowerCase();
    if (v.includes("soma") || v.includes("mon")) {
      return {
        deity: "Lord Shiva",
        mantraId: "om-namah-shivaya",
        mantraName: "Om Namah Shivaya",
        practice: "Shivaling Puja & Nama Japa",
        reason:
          "It is Monday (Somavara), Shiva's day. Chanting his holy name today pacifies the mind, balances emotions, and strengthens focus.",
      };
    }
    if (v.includes("mangal") || v.includes("tue")) {
      return {
        deity: "Lord Hanuman / Kartikeya",
        mantraId: "mahamrityunjaya",
        mantraName: "Mahamrityunjaya Mantra",
        practice: "Hanuman Chalisa recitation & Japa",
        reason:
          "It is Tuesday (Mangalavara). Reciting Hanuman's prayers and protective mantras today instills courage, discipline, and destroys fear.",
      };
    }
    if (v.includes("budha") || v.includes("wed")) {
      return {
        deity: "Lord Ganesha",
        mantraId: "gayatri",
        mantraName: "Gayatri Mantra",
        practice: "Ganapati Atharvashirsha & Chanting",
        reason:
          "It is Wednesday (Budhavara), Ganesha's day. Focus on Ganesha and Gayatri mantras today to cultivate wisdom, clarity, and obstacle removal.",
      };
    }
    if (v.includes("guru") || v.includes("thu")) {
      return {
        deity: "Lord Vishnu / Spiritual Guru",
        mantraId: "hare-krishna",
        mantraName: "Hare Krishna Mahamantra",
        practice: "Guru Dhyana & Vishnu Chanting",
        reason:
          "It is Thursday (Guruvara), the day of the Guru and Vishnu. Chanting and meditating on spiritual mentors today amplifies knowledge and guidance.",
      };
    }
    if (v.includes("shukra") || v.includes("fri")) {
      return {
        deity: "Goddess Durga / Lakshmi",
        mantraId: "gayatri",
        mantraName: "Gayatri Mantra",
        practice: "Devi Stotra Chanting & Lakshmi Japa",
        reason:
          "It is Friday (Shukravara), dedicated to the Divine Mother. Chanting Gayatri or Devi mantras today invites grace, abundance, and creative energy.",
      };
    }
    if (v.includes("shani") || v.includes("sat")) {
      return {
        deity: "Lord Hanuman",
        mantraId: "mahamrityunjaya",
        mantraName: "Mahamrityunjaya Mantra",
        practice: "Hanuman Japa & Shani Shanti Prayers",
        reason:
          "It is Saturday (Shanivara). Worshiping Hanuman and chanting protective mantras today mitigates planetary challenges and increases endurance.",
      };
    }

    // Sunday default
    return {
      deity: "Sun God (Surya)",
      mantraId: "gayatri",
      mantraName: "Gayatri Mantra",
      practice: "Surya Arghya & Gayatri Japa",
      reason:
        "It is Sunday (Ravivara), Surya's day. Perform Sun salutations and chant the sacred Gayatri mantra to ignite physical vitality and intellectual light.",
    };
  };

  const handleApplyMantra = () => {
    if (!rec) return;

    const event = new CustomEvent("set-active-mantra", {
      detail: { mantraId: rec.mantraId },
    });
    window.dispatchEvent(event);

    trackEvent("sadhana_goal_changed", {
      mantra_id: `apply-${rec.mantraId}`,
      goal: 108,
    });

    // Scroll to counter
    const counterEl = document.getElementById("counter");
    if (counterEl) {
      counterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!panchanga || !rec) return null;

  return (
    <Card className="border-border/70 shadow-md">
      <CardHeader className="border-b border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <CardTitle className="font-serif text-xl tracking-[-0.015em]">
              Today&apos;s Astrological Guide
            </CardTitle>
          </div>
          <span className="eyebrow rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px]">
            {panchanga.vara}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Panchanga Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/60 bg-background/50 p-3.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Moon className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">Tithi</span>
            </div>
            <p className="mt-1.5 text-base font-semibold">{panchanga.tithi.sanskrit}</p>
            <p className="text-xs text-muted-foreground">
              {panchanga.tithi.name} ({panchanga.tithi.paksha} Paksha)
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-background/50 p-3.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">Nakshatra</span>
            </div>
            <p className="mt-1.5 text-base font-semibold">{panchanga.nakshatra.sanskrit}</p>
            <p className="text-xs text-muted-foreground">
              {panchanga.nakshatra.name} (Lord: {panchanga.nakshatra.lord})
            </p>
          </div>
        </div>

        {/* Dynamic Sadhana Advice */}
        <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Daily Recommendation
              </p>
              <h4 className="mt-1 font-serif text-lg font-semibold text-foreground">
                {rec.practice}
              </h4>
            </div>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">{rec.reason}</p>

          <div className="flex flex-col gap-3 border-t border-primary/10 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs">
              <span className="text-muted-foreground">Suggested Mantra:</span>{" "}
              <span className="font-semibold text-foreground">{rec.mantraName}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyMantra}
              className="self-end rounded-xl border-primary/30 bg-background text-xs text-primary hover:bg-primary/5 sm:self-auto"
            >
              Set Mala to {rec.mantraName.split(" ")[0]}
            </Button>
          </div>
        </div>

        {/* Timings */}
        <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sun className="size-3.5 text-amber-500" />
            <span>Sunrise: {panchanga.sunrise}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Moon className="size-3.5 text-indigo-400" />
            <span>Sunset: {panchanga.sunset}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>Twilight Ends: {panchanga.tithi.endTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
