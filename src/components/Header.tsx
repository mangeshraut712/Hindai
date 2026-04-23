"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ChevronDown, Menu, Moon, Search, Sparkles, Sun, Trophy } from "lucide-react";
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
  { label: "Library", hindi: "Granthalaya", href: "/contents" },
  { label: "Guru AI", hindi: "Guru AI", href: "/ai-guide", icon: Sparkles },
  { label: "Daily", hindi: "Dainik", href: "/daily" },
  { label: "Study Paths", hindi: "Patha", href: "/study-paths" },
  { label: "Quiz", hindi: "Pariksha", href: "/quiz", icon: Trophy },
  { label: "Structure", hindi: "Vinyas", href: "/structure" },
  { label: "Preface", hindi: "Prastavana", href: "/preface" },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <header className="bg-background/72 sticky top-0 z-50 border-b border-border/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => handleNavigation("/", "Home")}
        >
          <div className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/70 text-primary shadow-[0_18px_42px_-30px_rgba(15,23,42,0.35)]">
            <Image
              src="/logo.png"
              alt="Hind AI Logo"
              width={44}
              height={44}
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-semibold tracking-[0.02em] text-foreground">Hind AI</div>
            <div className="font-devanagari text-[11px] tracking-[0.24em] text-muted-foreground">
              डिजिटल गुरुकुल
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
          suppressHydrationWarning
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                Scriptures
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-background/88 w-80 rounded-[24px] border-border/70 p-2 backdrop-blur-2xl"
            >
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
              className="group text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              onClick={() => handleNavigation(item.href, item.label)}
            >
              <span className="inline-flex items-center gap-2">
                {item.icon ? <item.icon className="size-4 text-primary/80" /> : null}
                {item.label}
              </span>
              <span className="mt-1 block font-devanagari text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {item.hindi}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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

          <VoiceSearch onResult={handleVoiceSearch} className="hidden sm:flex" />

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
                <SheetDescription className="text-left font-devanagari tracking-[0.18em]">
                  डिजिटल गुरुकुल
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-8">
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
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 transition-colors hover:bg-secondary/70"
                        onClick={() => handleNavigation(item.href, item.label)}
                      >
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 font-devanagari text-xs tracking-[0.18em] text-muted-foreground">
                          {item.hindi}
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
