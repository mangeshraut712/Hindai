"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Sun, Moon, Star, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Festival, Panchanga } from "@/lib/panchanga/types";

export default function PanchangaPage() {
  const [panchanga, setPanchanga] = useState<Panchanga | null>(null);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchPanchanga(selectedDate);
  }, [selectedDate]);

  const fetchPanchanga = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const [panchangaResponse, festivalResponse] = await Promise.all([
        fetch(`/api/panchanga?date=${encodeURIComponent(date.toISOString())}`),
        fetch("/api/panchanga?upcoming=true&count=6"),
      ]);

      if (!panchangaResponse.ok || !festivalResponse.ok) {
        throw new Error("Panchanga service returned an error");
      }

      const panchangaData = await panchangaResponse.json();
      const festivalData = await festivalResponse.json();
      setPanchanga(panchangaData.panchanga);
      setFestivals(festivalData.festivals ?? []);
    } catch (error) {
      console.error("Failed to fetch Panchanga:", error);
      setError("Unable to load calendar details right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading || !panchanga) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">{error ?? "Calculating Panchanga..."}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="hero-mesh relative overflow-hidden border-b border-border/60">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun -left-20 top-10 size-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun right-0 top-20 size-72 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <span className="eyebrow">Panchanga • पञ्चाङ्ग</span>
              <h1 className="section-title mt-6">Daily Hindu Calendar</h1>
              <p className="section-copy mt-5">
                Tithi, Nakshatra, Yoga, Karana, and Vara - the five elements of Hindu time
                calculation for spiritual practice and auspicious timing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Date Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-between"
            >
              <Button variant="outline" onClick={() => handleDateChange(-1)}>
                Previous Day
              </Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Selected Date</p>
                <p className="text-lg font-semibold">{formatDate(selectedDate)}</p>
              </div>
              <Button variant="outline" onClick={() => handleDateChange(1)}>
                Next Day
              </Button>
            </motion.div>

            {error ? (
              <div className="mb-8 rounded-[24px] border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            {/* Panchanga Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Tithi */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Moon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tithi (Lunar Day)</p>
                    <p className="text-2xl font-semibold">{panchanga.tithi.sanskrit}</p>
                    <p className="text-sm text-muted-foreground">{panchanga.tithi.name}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paksha</span>
                    <span className="font-medium">{panchanga.tithi.paksha}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ends at</span>
                    <span className="font-medium">{panchanga.tithi.endTime}</span>
                  </div>
                </div>
              </motion.div>

              {/* Nakshatra */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Star className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nakshatra</p>
                    <p className="text-2xl font-semibold">{panchanga.nakshatra.sanskrit}</p>
                    <p className="text-sm text-muted-foreground">{panchanga.nakshatra.name}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lord</span>
                    <span className="font-medium">{panchanga.nakshatra.lord}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ends at</span>
                    <span className="font-medium">{panchanga.nakshatra.endTime}</span>
                  </div>
                </div>
              </motion.div>

              {/* Yoga */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Yoga</p>
                    <p className="text-2xl font-semibold">{panchanga.yoga.sanskrit}</p>
                    <p className="text-sm text-muted-foreground">{panchanga.yoga.name}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number</span>
                    <span className="font-medium">{panchanga.yoga.number}/27</span>
                  </div>
                </div>
              </motion.div>

              {/* Karana */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Karana</p>
                    <p className="text-2xl font-semibold">{panchanga.karana.sanskrit}</p>
                    <p className="text-sm text-muted-foreground">{panchanga.karana.name}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number</span>
                    <span className="font-medium">{panchanga.karana.number}/11</span>
                  </div>
                </div>
              </motion.div>

              {/* Vara */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vara (Weekday)</p>
                    <p className="text-2xl font-semibold">{panchanga.vara}</p>
                  </div>
                </div>
              </motion.div>

              {/* Sun & Moon Times */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="surface-panel p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sun className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sunrise</p>
                    <p className="text-2xl font-semibold">{panchanga.sunrise}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sunset</span>
                    <span className="font-medium">{panchanga.sunset}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Moonrise</span>
                    <span className="font-medium">{panchanga.moonrise}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Moonset</span>
                    <span className="font-medium">{panchanga.moonset}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="surface-panel mt-10 p-6 md:p-8"
            >
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="eyebrow">Festival calendar • उत्सव</span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                    Upcoming festivals with puja vidhi.
                  </h2>
                </div>
                <Button variant="outline" asChild>
                  <a href="/api/panchanga?upcoming=true&count=12">Open festival data</a>
                </Button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {festivals.map((festival) => (
                  <article
                    key={festival.id}
                    className="rounded-[24px] border border-border/60 bg-background/75 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-devanagari text-xl text-primary">{festival.sanskrit}</p>
                        <h3 className="mt-1 text-xl font-semibold text-foreground">
                          {festival.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {new Date(festival.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {festival.description}
                    </p>
                    <div className="mt-4 space-y-3 text-sm leading-6">
                      <p>
                        <span className="font-semibold text-foreground">Puja vidhi: </span>
                        <span className="text-muted-foreground">{festival.pujaVidhi}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Significance: </span>
                        <span className="text-muted-foreground">{festival.significance}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
