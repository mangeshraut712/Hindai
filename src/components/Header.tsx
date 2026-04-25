"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BookOpen,
  ChevronDown,
  Languages,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Trophy,
} from "lucide-react";
import { track } from "@vercel/analytics";
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

const navItems = [
  { label: "Library", script: "ग्रन्थालय", href: "/contents", icon: BookOpen },
  { label: "Guru AI", script: "गुरु", href: "/ai-guide", icon: Sparkles },
  { label: "Sanskrit", script: "संस्कृत", href: "/sanskrit-nova", icon: Languages },
  { label: "Study Paths", script: "पाठ", href: "/study-paths" },
  { label: "Daily", script: "दैनिक", href: "/daily" },
];

const moreItems = [
  { label: "Quiz", script: "परीक्षा", href: "/quiz", icon: Trophy },
  { label: "Structure", script: "विन्यास", href: "/structure" },
  { label: "Preface", script: "प्रस्तावना", href: "/preface" },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname === `${href}/`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
        track("search_shortcut_used");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    track("search_button_clicked");
  };

  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    track("theme_toggled", { theme: nextTheme });
  };

  const handleNavigation = (href: string, label: string) => {
    track("navigation_click", { destination: href, label });
    setIsOpen(false);
  };

  const handleVoiceSearch = (transcript: string) => {
    track("voice_search_used", { query: transcript });
    setIsSearchOpen(true);
  };

  return (
    <header className="supports-[backdrop-filter]:bg-background/72 sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => handleNavigation("/", "Home")}
        >
          <div className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/80 text-primary shadow-[0_18px_42px_-30px_rgba(15,23,42,0.35)]">
            <Image
              src="/logo.png"
              alt="Hind AI Logo"
              width={44}
              height={44}
              className="object-cover"
              priority
              loading="eager"
            />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold tracking-[0.01em] text-foreground">Hind AI</div>
            <div className="font-devanagari text-[11px] tracking-[0.18em] text-muted-foreground">
              डिजिटल गुरुकुल
            </div>
          </div>
        </Link>

        <nav
          className="bg-background/54 hidden items-center gap-1 rounded-full border border-border/60 p-1 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.5)] lg:flex"
          aria-label="Primary"
          suppressHydrationWarning
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="nav-pill gap-2">
                Scriptures
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-background/88 w-80 rounded-[24px] border-border/70 p-2 backdrop-blur-2xl"
            >
              <div className="px-3 pb-2 pt-1">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  प्रमुख ग्रन्थ · Featured Texts
                </p>
              </div>
              {headerScriptures.map((item) => (
                <DropdownMenuItem key={item.slug} asChild className="rounded-2xl px-4 py-3">
                  <Link
                    href={item.href}
                    className="flex flex-col gap-1"
                    onClick={() => handleNavigation(item.href, item.name)}
                  >
                    <span className="font-devanagari text-base text-foreground">
                      {item.sanskrit}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.highlight}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-pill group ${isActive(item.href) ? "nav-pill-active" : ""}`}
              onClick={() => handleNavigation(item.href, item.label)}
            >
              <span className="inline-flex items-center gap-1.5">
                {item.icon ? <item.icon className="size-4 text-primary/80" /> : null}
                {item.label}
              </span>
              <span className="sr-only"> {item.script}</span>
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="nav-pill gap-2">
                More
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background/92 w-56 rounded-[24px] border-border/70 p-2 backdrop-blur-2xl"
            >
              {moreItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="rounded-2xl px-4 py-3">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3"
                    onClick={() => handleNavigation(item.href, item.label)}
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      {item.icon ? <item.icon className="size-4 text-primary" /> : null}
                      {item.label}
                    </span>
                    <span className="font-devanagari text-xs text-muted-foreground">
                      {item.script}
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 xl:flex" aria-label="Study languages">
            <span className="script-chip">EN</span>
            <span className="script-chip font-devanagari">हिंदी</span>
            <span className="script-chip font-devanagari">संस्कृत</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 sm:inline-flex"
            onClick={handleSearchClick}
            aria-label="Open search dialog"
          >
            <Search className="size-4" />
            Search
            <kbd className="hidden rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-flex">
              ⌘K
            </kbd>
          </Button>

          <VoiceSearch onResult={handleVoiceSearch} className="hidden md:flex" />

          <Button variant="ghost" size="icon" onClick={handleThemeToggle} aria-label="Toggle theme">
            <Sun className="size-4 rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background/92 w-[22rem] border-border/70 px-6 py-5 backdrop-blur-2xl"
            >
              <SheetHeader className="border-b border-border/60 pb-5">
                <SheetTitle className="text-left text-xl font-semibold">Hind AI</SheetTitle>
                <SheetDescription className="text-left">
                  <span className="font-devanagari tracking-[0.16em]">डिजिटल गुरुकुल</span>
                  <span className="mt-3 flex flex-wrap gap-2">
                    <span className="script-chip">English</span>
                    <span className="script-chip font-devanagari">हिंदी</span>
                    <span className="script-chip font-devanagari">संस्कृत</span>
                  </span>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-7">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    handleSearchClick();
                    setIsOpen(false);
                  }}
                >
                  <Search className="size-4" />
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
                        className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 transition-colors hover:bg-secondary/70"
                        onClick={() => handleNavigation(item.href, item.name)}
                      >
                        <p className="font-devanagari text-sm text-primary">{item.sanskrit}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{item.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                    Explore
                  </p>
                  <div className="grid gap-2">
                    {[...navItems, ...moreItems].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-[20px] border px-4 py-3 transition-colors hover:bg-secondary/70 ${
                          isActive(item.href)
                            ? "border-primary/45 bg-primary/10"
                            : "border-border/60 bg-background/70"
                        }`}
                        onClick={() => handleNavigation(item.href, item.label)}
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
