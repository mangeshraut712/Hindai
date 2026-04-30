"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Compass,
  Eye,
  Languages,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchDialog } from "@/components/search";
import { VoiceSearch } from "@/components/voice-search";
import { headerScriptures } from "@/lib/scripture-catalog";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n/context";

const aiFeaturesItems = [
  { label: "Guru AI", script: "गुरु", href: "/ai-guide", icon: Sparkles },
  { label: "Vision", script: "दृष्टि", href: "/vision", icon: Eye },
  { label: "Dharma", script: "धर्म", href: "/dharma", icon: Compass },
];

const learningItems = [
  { label: "Sanskrit Studio", script: "संस्कृत", href: "/sanskrit-nova", icon: Languages },
  { label: "Sanskrit Tools", script: "उपकरण", href: "/sanskrit-tools", icon: Languages },
  { label: "Learning Hub", script: "अधिगम", href: "/learning", icon: BookOpen },
];

const cultureItems = [
  { label: "Philosophies", script: "दर्शन", href: "/philosophies", icon: BookOpen },
  { label: "Frameworks", script: "संरचना", href: "/frameworks", icon: BookOpen },
  { label: "Stotras", script: "स्तोत्र", href: "/stotras", icon: BookOpen },
];

const resourcesItems = [
  { label: "Library", script: "ग्रन्थालय", href: "/contents", icon: BookOpen },
  { label: "Panchanga", script: "पञ्चाङ्ग", href: "/panchanga", icon: Calendar },
  { label: "Pilgrimage", script: "तीर्थ", href: "/pilgrimage", icon: BookOpen },
  { label: "Audio", script: "आडियो", href: "/audio", icon: BookOpen },
];

const moreItems = [
  { label: "Study Paths", script: "पाठ", href: "/study-paths", icon: BookOpen },
  { label: "Community", script: "समुदाय", href: "/community", icon: Users },
  { label: "Quiz", script: "परीक्षा", href: "/quiz", icon: Trophy },
  { label: "Daily", script: "दैनिक", href: "/daily", icon: Sun },
  { label: "Structure", script: "विन्यास", href: "/structure", icon: BookOpen },
  { label: "Preface", script: "प्रस्तावना", href: "/preface", icon: Sparkles },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const isActive = (href: string) => pathname === href || pathname === `${href}/`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleVoiceSearch = (transcript: string) => {
    setIsSearchOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => handleNavigation()}
        >
          <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-[0_18px_42px_-30px_rgba(25,88,50,0.25)] transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_18px_42px_-30px_rgba(25,88,50,0.35)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/logo.png"
              alt="Hind AI Logo"
              width={44}
              height={44}
              className="relative object-cover"
              priority
              loading="eager"
            />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold tracking-[0.01em] text-foreground transition-colors duration-300 group-hover:text-primary">
              Hind AI
            </div>
            <div className="font-devanagari text-[11px] tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-primary/80">
              डिजिटल गुरुकुल
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1.5 rounded-2xl border border-border/60 bg-background/60 px-2 py-1.5 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.15)] xl:flex"
          aria-label="Primary"
          suppressHydrationWarning
        >
          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Scriptures</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">ग्रन्थ</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="px-3 pb-2 pt-1">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    प्रमुख ग्रन्थ · Featured Texts
                  </p>
                </div>
                <div className="flex flex-col">
                  {headerScriptures.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className="flex flex-col gap-1 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <span className="font-devanagari text-base text-foreground">
                        {item.sanskrit}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.highlight}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">AI Features</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">प्रज्ञा</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  {aiFeaturesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                          {item.label}
                        </span>
                        <span className="font-devanagari text-xs text-muted-foreground">
                          {item.script}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Learning</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">अध्ययन</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  {learningItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                          {item.label}
                        </span>
                        <span className="font-devanagari text-xs text-muted-foreground">
                          {item.script}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Culture</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">संस्कृति</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  {cultureItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                          {item.label}
                        </span>
                        <span className="font-devanagari text-xs text-muted-foreground">
                          {item.script}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Resources</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">संसाधन</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute right-0 top-full z-50 w-56 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                          {item.label}
                        </span>
                        <span className="font-devanagari text-xs text-muted-foreground">
                          {item.script}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <Button variant="ghost" size="sm" className="nav-pill gap-2">
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">More</span>
                <span className="font-devanagari text-[10px] text-muted-foreground">अधिक</span>
              </span>
              <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute right-0 top-full z-50 w-56 pt-2 group-hover:visible">
              <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
                    >
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                          {item.label}
                        </span>
                        <span className="font-devanagari text-xs text-muted-foreground">
                          {item.script}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-2 border-primary/30 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 xl:inline-flex"
              >
                <Languages className="size-4 text-primary/80" />
                <span className="text-xs">{language}</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background/92 w-40 rounded-[24px] border-border/70 p-2 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-2xl"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`rounded-2xl px-4 py-2 transition-colors hover:bg-primary/10 ${language === lang ? "bg-primary/10 text-primary" : ""}`}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 border-primary/30 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 sm:inline-flex"
            onClick={handleSearchClick}
            aria-label="Open search dialog"
          >
            <Search className="size-4 text-primary/80" />
            <span className="text-xs">Search</span>
            <kbd className="hidden rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-flex">
              ⌘K
            </kbd>
          </Button>

          <VoiceSearch onResult={handleVoiceSearch} className="hidden md:flex" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="transition-colors duration-300 hover:bg-primary/10"
          >
            <Sun className="size-4 rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="transition-colors duration-300 hover:bg-primary/10"
              >
                <Menu className="size-5 text-primary/80" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background/92 w-[22rem] border-border/70 px-6 py-5 backdrop-blur-2xl"
            >
              <SheetHeader className="border-b border-border/60 pb-5">
                <SheetTitle className="text-left text-xl font-semibold text-primary">
                  Hind AI
                </SheetTitle>
                <SheetDescription className="text-left">
                  <span className="font-devanagari tracking-[0.16em] text-muted-foreground">
                    डिजिटल गुरुकुल
                  </span>
                  <div className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-1.5 py-1">
                    {SUPPORTED_LANGUAGES.map((lang, i) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                          language === lang
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lang === "English" ? "EN" : lang}
                      </button>
                    ))}
                  </div>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-7">
                <Button
                  variant="outline"
                  className="w-full justify-start border-primary/30 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => {
                    handleSearchClick();
                    setIsOpen(false);
                  }}
                >
                  <Search className="size-4 text-primary" />
                  Search scriptures
                </Button>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Scriptures
                  </p>
                  <div className="grid gap-2">
                    {headerScriptures.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.href}
                        className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                        onClick={() => handleNavigation()}
                      >
                        <p className="font-devanagari text-sm text-primary">{item.sanskrit}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{item.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    AI Features
                  </p>
                  <div className="grid gap-2">
                    {aiFeaturesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation()}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
                          {item.script}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Learning
                  </p>
                  <div className="grid gap-2">
                    {learningItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation()}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
                          {item.script}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Culture
                  </p>
                  <div className="grid gap-2">
                    {cultureItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation()}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
                          {item.script}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Resources
                  </p>
                  <div className="grid gap-2">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation()}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
                          {item.script}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    More
                  </p>
                  <div className="grid gap-2">
                    {moreItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation()}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
                          {item.script}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
