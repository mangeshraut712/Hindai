"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { LucideIcon } from "lucide-react";
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
  TimerReset,
  Trophy,
  Users,
} from "lucide-react";
import { SearchDialog } from "@/components/search";
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
import { VoiceSearch } from "@/components/voice-search";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/context";
import type { Language } from "@/lib/i18n/types";
import { headerScriptures } from "@/lib/scripture-catalog";

type NavItem = {
  label: string;
  script: string;
  href: string;
  icon: LucideIcon;
};

const aiFeaturesItems: NavItem[] = [
  { label: "Guru AI", script: "गुरु", href: "/ai-guide", icon: Sparkles },
  { label: "Vision", script: "दृष्टि", href: "/vision", icon: Eye },
  { label: "Dharma", script: "धर्म", href: "/dharma", icon: Compass },
];

const learningItems: NavItem[] = [
  { label: "Sanskrit Studio", script: "संस्कृत", href: "/sanskrit-nova", icon: Languages },
  { label: "Sanskrit Tools", script: "उपकरण", href: "/sanskrit-tools", icon: Languages },
  { label: "Learning Hub", script: "अधिगम", href: "/learning", icon: BookOpen },
];

const cultureItems: NavItem[] = [
  { label: "Sadhana", script: "साधना", href: "/sadhana", icon: TimerReset },
  { label: "Philosophies", script: "दर्शन", href: "/philosophies", icon: BookOpen },
  { label: "Frameworks", script: "संरचना", href: "/frameworks", icon: BookOpen },
  { label: "Stotras", script: "स्तोत्र", href: "/stotras", icon: BookOpen },
];

const resourcesItems: NavItem[] = [
  { label: "Library", script: "ग्रन्थालय", href: "/contents", icon: BookOpen },
  { label: "Panchanga", script: "पञ्चाङ्ग", href: "/panchanga", icon: Calendar },
  { label: "Pilgrimage", script: "तीर्थ", href: "/pilgrimage", icon: BookOpen },
  { label: "Audio", script: "आडियो", href: "/audio", icon: BookOpen },
];

const moreItems: NavItem[] = [
  { label: "Guide", script: "मार्ग", href: "/guide", icon: Sparkles },
  { label: "Study Paths", script: "पाठ", href: "/study-paths", icon: BookOpen },
  { label: "Community", script: "समुदाय", href: "/community", icon: Users },
  { label: "Quiz", script: "परीक्षा", href: "/quiz", icon: Trophy },
  { label: "Daily", script: "दैनिक", href: "/daily", icon: Sun },
  { label: "Structure", script: "विन्यास", href: "/structure", icon: BookOpen },
  { label: "Preface", script: "प्रस्तावना", href: "/preface", icon: Sparkles },
];

const desktopGroups = [
  { label: "AI Features", script: "प्रज्ञा", items: aiFeaturesItems, align: "left" },
  { label: "Learning", script: "अध्ययन", items: learningItems, align: "left" },
  { label: "Culture", script: "संस्कृति", items: cultureItems, align: "center" },
  { label: "Resources", script: "संसाधन", items: resourcesItems, align: "right" },
  { label: "More", script: "अधिक", items: moreItems, align: "right" },
] as const;

const mobileGroups = [
  { title: "AI Features", items: aiFeaturesItems },
  { title: "Learning", items: learningItems },
  { title: "Culture", items: cultureItems },
  { title: "Resources", items: resourcesItems },
  { title: "More", items: moreItems },
];

function BrandLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={onNavigate}>
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
  );
}

function DesktopMenu() {
  return (
    <nav
      className="hidden items-center gap-1.5 rounded-2xl border border-border/60 bg-background/60 px-2 py-1.5 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.15)] xl:flex"
      aria-label="Primary"
      suppressHydrationWarning
    >
      <ScripturesDesktopGroup />
      {desktopGroups.map((group) => (
        <DesktopMenuGroup key={group.label} {...group} />
      ))}
    </nav>
  );
}

function DesktopMenuGroup({
  label,
  script,
  items,
  align,
}: {
  label: string;
  script: string;
  items: NavItem[];
  align: "left" | "center" | "right";
}) {
  const alignment =
    align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0";

  return (
    <div className="group relative">
      <Button variant="ghost" size="sm" className="nav-pill gap-2">
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-semibold">{label}</span>
          <span className="font-devanagari text-[10px] text-muted-foreground">{script}</span>
        </span>
        <ChevronDown className="ml-1 size-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </Button>
      <div
        className={`invisible absolute top-full z-50 w-56 pt-2 group-hover:visible ${alignment}`}
      >
        <div className="flex -translate-y-2 flex-col rounded-[24px] border border-border/70 bg-background/95 p-2 opacity-0 shadow-[0_20px_60px_-48px_rgba(25,88,50,0.2)] backdrop-blur-3xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {items.map((item) => (
            <DesktopMenuLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopMenuLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
    >
      <div className="flex flex-col">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <item.icon className="size-4 text-primary" />
          {item.label}
        </span>
        <span className="font-devanagari text-xs text-muted-foreground">{item.script}</span>
      </div>
    </Link>
  );
}

function ScripturesDesktopGroup() {
  return (
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
          {headerScriptures.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="flex flex-col gap-1 rounded-2xl px-4 py-3 transition-colors hover:bg-primary/10"
            >
              <span className="font-devanagari text-base text-foreground">{item.sanskrit}</span>
              <span className="text-sm font-semibold text-foreground">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.highlight}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeaderActions({
  language,
  setLanguage,
  onSearch,
  onThemeToggle,
  onVoiceSearch,
  isOpen,
  setIsOpen,
  isActive,
}: {
  language: string;
  setLanguage: (language: Language) => void;
  onSearch: () => void;
  onThemeToggle: () => void;
  onVoiceSearch: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <LanguageMenu language={language} setLanguage={setLanguage} />
      <Button
        variant="outline"
        size="sm"
        className="hidden gap-2 border-primary/30 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 sm:inline-flex"
        onClick={onSearch}
        aria-label="Open search dialog"
      >
        <Search className="size-4 text-primary/80" />
        <span className="text-xs">Search</span>
        <kbd className="hidden rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-flex">
          ⌘K
        </kbd>
      </Button>
      <VoiceSearch onResult={onVoiceSearch} className="hidden md:flex" />
      <ThemeButton onThemeToggle={onThemeToggle} />
      <MobileMenu
        open={isOpen}
        setOpen={setIsOpen}
        language={language}
        setLanguage={setLanguage}
        onSearch={onSearch}
        isActive={isActive}
      />
    </div>
  );
}

function LanguageMenu({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: Language) => void;
}) {
  return (
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
  );
}

function ThemeButton({ onThemeToggle }: { onThemeToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onThemeToggle}
      aria-label="Toggle theme"
      className="transition-colors duration-300 hover:bg-primary/10"
    >
      <Sun className="size-4 rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function MobileMenu({
  open,
  setOpen,
  language,
  setLanguage,
  onSearch,
  isActive,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  language: string;
  setLanguage: (language: Language) => void;
  onSearch: () => void;
  isActive: (href: string) => boolean;
}) {
  const handleNavigation = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="transition-colors duration-300 hover:bg-primary/10 xl:hidden"
        >
          <Menu className="size-5 text-primary/80" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-background/92 w-[22rem] border-border/70 px-6 py-5 backdrop-blur-2xl"
      >
        <MobileMenuHeader language={language} setLanguage={setLanguage} />
        <div className="mt-6 space-y-7">
          <Button
            variant="outline"
            className="w-full justify-start border-primary/30 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
            onClick={() => {
              onSearch();
              setOpen(false);
            }}
          >
            <Search className="size-4 text-primary" />
            Search scriptures
          </Button>
          <ScripturesMobileSection onNavigate={handleNavigation} />
          {mobileGroups.map((group) => (
            <MobileNavSection
              key={group.title}
              title={group.title}
              items={group.items}
              isActive={isActive}
              onNavigate={handleNavigation}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileMenuHeader({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: Language) => void;
}) {
  return (
    <SheetHeader className="border-b border-border/60 pb-5">
      <SheetTitle className="text-left text-xl font-semibold text-primary">Hind AI</SheetTitle>
      <SheetDescription className="text-left">
        <span className="font-devanagari tracking-[0.16em] text-muted-foreground">
          डिजिटल गुरुकुल
        </span>
        <div className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-1.5 py-1">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              type="button"
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
  );
}

function ScripturesMobileSection({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">Scriptures</p>
      <div className="grid gap-2">
        {headerScriptures.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-[20px] border border-border/60 bg-background/70 px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
            onClick={onNavigate}
          >
            <p className="font-devanagari text-sm text-primary">{item.sanskrit}</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNavSection({
  title,
  items,
  isActive,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">{title}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[20px] border px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 ${
              isActive(item.href)
                ? "border-primary/45 bg-primary/10"
                : "border-border/60 bg-background/70"
            }`}
            onClick={onNavigate}
          >
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="mt-1 font-devanagari text-xs tracking-[0.12em] text-muted-foreground">
              {item.script}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

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

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLink onNavigate={() => setIsOpen(false)} />
        <DesktopMenu />
        <HeaderActions
          language={language}
          setLanguage={setLanguage}
          onSearch={() => setIsSearchOpen(true)}
          onThemeToggle={handleThemeToggle}
          onVoiceSearch={() => setIsSearchOpen(true)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isActive={isActive}
        />
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
