"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Sun, Moon, Star, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getLocalPanchanga, getLocalUpcomingFestivals } from "@/lib/panchanga/local-panchanga";
import { Festival, Panchanga } from "@/lib/panchanga/types";
import { deepFestivalHref } from "@/lib/data/utsav";

export default function PanchangaPage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [panchanga, setPanchanga] = useState<Panchanga | null>(() => getLocalPanchanga(new Date()));
  const [festivals, setFestivals] = useState<Festival[]>(() => getLocalUpcomingFestivals(6));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPanchanga(selectedDate);
  }, [selectedDate]);

  const fetchPanchanga = (date: Date) => {
    setError(null);
    try {
      setPanchanga(getLocalPanchanga(date));
      setFestivals(getLocalUpcomingFestivals(6));
    } catch (caught) {
      console.error("Failed to fetch Panchanga:", caught);
      setError("Unable to load calendar details right now.");
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

  if (!panchanga) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main
          id="main-content"
          className="flex min-h-[50vh] flex-1 items-center justify-center px-4"
        >
          <div className="text-center">
            <p className="text-muted-foreground mt-4">
              {error ?? "Unable to load calendar details right now."}
            </p>
            {error && (
              <Button className="mt-4" onClick={() => fetchPanchanga(selectedDate)}>
                Try again
              </Button>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="hero-mesh border-border/60 relative overflow-hidden border-b">
          <div className="grain-mask absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="hero-sun top-10 -left-20 size-56 opacity-80" aria-hidden="true" />
          <div className="hero-sun top-20 right-0 size-72 opacity-60" aria-hidden="true" />
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
              className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Button variant="outline" onClick={() => handleDateChange(-1)}>
                Previous Day
              </Button>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">Selected Date</p>
                <p className="text-lg font-semibold">{formatDate(selectedDate)}</p>
              </div>
              <Button variant="outline" onClick={() => handleDateChange(1)}>
                Next Day
              </Button>
            </motion.div>
            {error ? (
              <div className="border-destructive/20 bg-destructive/10 text-destructive mb-8 rounded-[24px] border p-4 text-sm">
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Moon className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Tithi (Lunar Day)</p>
                    <p className="text-2xl font-semibold">{panchanga.tithi.sanskrit}</p>
                    <p className="text-muted-foreground text-sm">{panchanga.tithi.name}</p>
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Star className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Nakshatra</p>
                    <p className="text-2xl font-semibold">{panchanga.nakshatra.sanskrit}</p>
                    <p className="text-muted-foreground text-sm">{panchanga.nakshatra.name}</p>
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Sparkles className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Yoga</p>
                    <p className="text-2xl font-semibold">{panchanga.yoga.sanskrit}</p>
                    <p className="text-muted-foreground text-sm">{panchanga.yoga.name}</p>
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Clock className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Karana</p>
                    <p className="text-2xl font-semibold">{panchanga.karana.sanskrit}</p>
                    <p className="text-muted-foreground text-sm">{panchanga.karana.name}</p>
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Vara (Weekday)</p>
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
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Sun className="size-6" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Sunrise</p>
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
                  <h2 className="text-foreground mt-4 text-3xl font-semibold tracking-[-0.04em]">
                    Upcoming festivals with puja vidhi.
                  </h2>
                  <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-6">
                    Want origin stories, temple etiquette, and do/don’t? Open the{" "}
                    <Link href="/festivals" className="text-primary font-semibold">
                      deep Festivals encyclopedia
                    </Link>
                    .
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setFestivals(getLocalUpcomingFestivals(12))}
                >
                  Show more festivals
                </Button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {festivals.map((festival) => {
                  const deepHref = deepFestivalHref(festival.id);
                  return (
                    <article
                      key={festival.id}
                      className="border-border/60 bg-background/75 rounded-[24px] border p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-devanagari text-primary text-xl">
                            {festival.sanskrit}
                          </p>
                          <h3 className="text-foreground mt-1 text-xl font-semibold">
                            {festival.name}
                          </h3>
                        </div>
                        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                          {new Date(festival.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-3 text-sm leading-6">
                        {festival.description}
                      </p>
                      <div className="mt-4 space-y-3 text-sm leading-6">
                        <p>
                          <span className="text-foreground font-semibold">Puja vidhi: </span>
                          <span className="text-muted-foreground">{festival.pujaVidhi}</span>
                        </p>
                        <p>
                          <span className="text-foreground font-semibold">Significance: </span>
                          <span className="text-muted-foreground">{festival.significance}</span>
                        </p>
                        {deepHref ? (
                          <p>
                            <Link href={deepHref} className="text-primary font-semibold">
                              Read the deep festival page →
                            </Link>
                          </p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </motion.div>{" "}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
