"use client";

import { useEffect, useState } from "react";
import { Calendar, Bell, BellOff, Sparkles, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUpcomingFestivals } from "@/lib/panchanga/festivals";
import { Festival } from "@/lib/panchanga/types";
import { trackEvent } from "@/lib/analytics";

type ReminderMap = Record<string, boolean>;

export function FestivalReminders() {
  const [upcomingFestivals, setUpcomingFestivals] = useState<Festival[]>([]);
  const [reminders, setReminders] = useState<ReminderMap>({});
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  useEffect(() => {
    // Get upcoming festivals
    const list = getUpcomingFestivals(4);
    setUpcomingFestivals(list);

    // Read set reminders from localStorage
    try {
      const stored = window.localStorage.getItem("hind-ai-festival-reminders");
      if (stored) {
        setReminders(JSON.parse(stored) as ReminderMap);
      }
    } catch (e) {
      console.error("Failed to load reminders: ", e);
    }
  }, []);

  const toggleReminder = (festivalId: string, festivalName: string) => {
    const updated = {
      ...reminders,
      [festivalId]: !reminders[festivalId],
    };
    setReminders(updated);

    try {
      window.localStorage.setItem("hind-ai-festival-reminders", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save reminder: ", e);
    }

    trackEvent("sadhana_goal_changed", {
      mantra_id: `reminder-${festivalId}`,
      goal: updated[festivalId] ? 1 : 0, // 1 for set, 0 for unset
    });

    if (updated[festivalId] && "Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(`Reminder Set for ${festivalName}`, {
            body: `We will remind you of puja vidhi and auspicious timings on ${festivalName}.`,
            icon: "/favicon.ico",
          });
        }
      });
    }
  };

  const handleApplyMantra = (deityId: string, festivalName: string) => {
    // Map deity/festival to standard presets
    let mantraId = "gayatri";
    if (
      deityId.toLowerCase().includes("shiva") ||
      festivalName.toLowerCase().includes("shivaratri")
    ) {
      mantraId = "om-namah-shivaya";
    } else if (
      deityId.toLowerCase().includes("krishna") ||
      festivalName.toLowerCase().includes("janmashtami")
    ) {
      mantraId = "hare-krishna";
    } else if (
      deityId.toLowerCase().includes("ganesh") ||
      festivalName.toLowerCase().includes("ganesh")
    ) {
      mantraId = "gayatri"; // fallback or Ganesha
    } else if (
      festivalName.toLowerCase().includes("navratri") ||
      festivalName.toLowerCase().includes("durga")
    ) {
      mantraId = "gayatri";
    }

    const event = new CustomEvent("set-active-mantra", {
      detail: { mantraId },
    });
    window.dispatchEvent(event);

    trackEvent("sadhana_mantra_selected", {
      mantra_id: `festival-${festivalName.replace(/\s+/g, "-").toLowerCase()}`,
    });

    // Scroll to counter
    const counterEl = document.getElementById("counter");
    if (counterEl) {
      counterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  if (upcomingFestivals.length === 0) return null;

  return (
    <Card className="border-border/70 shadow-md">
      <CardHeader className="border-b border-border/60 bg-gradient-to-r from-primary/5 to-accent/5 py-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-primary" />
          <CardTitle className="font-serif text-xl tracking-[-0.015em]">
            Upcoming Vrats & Festivals
          </CardTitle>
        </div>
        <CardDescription>
          Align your daily japa with upcoming solar and lunar holy days.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-5">
          {upcomingFestivals.map((fest) => {
            const hasReminder = !!reminders[fest.id];

            return (
              <div
                key={fest.id}
                className="rounded-2xl border border-border/60 bg-background/50 p-4 transition-all hover:border-primary/20 hover:bg-background/80"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground sm:text-base">
                        {fest.name}
                      </span>
                      <span className="font-devanagari text-xs font-bold text-primary">
                        {fest.sanskrit}
                      </span>
                      <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {fest.type}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {formatDate(fest.date)}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-foreground/80">{fest.description}</p>
                  </div>

                  <div className="flex shrink-0 flex-row gap-2 self-end sm:flex-col sm:self-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReminder(fest.id, fest.name)}
                      className={`h-8 rounded-xl px-3 text-xs ${
                        hasReminder ? "border-primary/40 bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {hasReminder ? (
                        <Bell className="size-3.5" />
                      ) : (
                        <BellOff className="size-3.5" />
                      )}
                      <span className="ml-1.5">{hasReminder ? "Reminder On" : "Set Reminder"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplyMantra(fest.id, fest.name)}
                      className="h-8 rounded-xl border-primary/20 px-3 text-xs text-primary hover:bg-primary/5"
                    >
                      <Sparkles className="size-3.5" />
                      <span className="ml-1.5">Add Mantra</span>
                    </Button>
                  </div>
                </div>

                {/* Puja Vidhi Drawer/Accordeon */}
                <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
                  <button
                    onClick={() => setActiveDialog(activeDialog === fest.id ? null : fest.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline focus:outline-none"
                  >
                    <Info className="size-3.5" />
                    <span>
                      {activeDialog === fest.id ? "Hide Details" : "View Puja Vidhi & Significance"}
                    </span>
                  </button>
                </div>

                {activeDialog === fest.id && (
                  <div className="mt-3 space-y-3.5 rounded-xl border border-border/40 bg-secondary/10 p-3.5 text-xs text-muted-foreground duration-200 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        Puja Vidhi (Method of Worship)
                      </span>
                      <p className="leading-5">{fest.pujaVidhi}</p>
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        Significance
                      </span>
                      <p className="leading-5">{fest.significance}</p>
                    </div>
                    {fest.regional && fest.regional.length > 0 && (
                      <div>
                        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-foreground">
                          Regional Celebrations
                        </span>
                        <p className="leading-5">{fest.regional.join(", ")}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
