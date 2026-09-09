"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ChevronDown, Languages, Menu, Moon, Search, Sun } from "lucide-react";
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
import { SITE_NAV_GROUPS, type SiteNavGroup, type SiteNavItem } from "@/lib/site-nav";

function BrandLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2"
      onClick={onNavigate}
      aria-label="Hind AI home"
    >
      <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 sm:size-10">
        <Image
          src="/logo.png"
          alt="Hind AI"
          width={40}
          height={40}
          className="size-full object-cover"
          priority
          unoptimized
        />
      </div>
      <span className="min-w-0 leading-tight">
        <span className="block text-[15px] font-semibold text-foreground group-hover:text-primary sm:text-base">
          Hind AI
        </span>
        <span className="block font-devanagari text-[10px] text-muted-foreground sm:text-[11px]">
          डिजिटल गुरुकुल
        </span>
      </span>
    </Link>
  );
}

function DesktopMenu() {
  return (
    <nav
      className="hidden min-w-0 items-center gap-0.5 overflow-visible rounded-2xl border border-border bg-card px-1.5 py-1 lg:flex"
      aria-label="Primary"
      suppressHydrationWarning
    >
      <LibraryDesktopGroup />
      {SITE_NAV_GROUPS.map((group) => (
        <DesktopMenuGroup key={group.id} group={group} />
      ))}
    </nav>
  );
}

function DesktopMenuGroup({ group }: { group: SiteNavGroup }) {
  const alignment =
    group.align === "center"
      ? "left-1/2 -translate-x-1/2"
      : group.align === "right"
        ? "right-0"
        : "left-0";

  return (
    <div className="group relative">
      <Button
        variant="ghost"
        size="sm"
        className="nav-pill h-9 gap-1 px-3 text-foreground"
        aria-haspopup="true"
      >
        <span className="text-sm font-semibold">{group.label}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
      </Button>
      <div
        className={`invisible absolute top-full z-50 w-72 pt-2 group-focus-within:visible group-hover:visible ${alignment}`}
      >
        <div className="flex -translate-y-1 flex-col rounded-2xl border border-border bg-card p-2 opacity-0 shadow-lg transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="px-3 pb-2 pt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {group.description}
          </p>
          {group.items.map((item) => (
            <DesktopMenuLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopMenuLink({ item }: { item: SiteNavItem }) {
  return (
    <Link
      href={item.href}
      className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-foreground transition-colors hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none"
    >
      <item.icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{item.label}</span>
        <span className="block text-xs text-muted-foreground">{item.hint}</span>
      </span>
    </Link>
  );
}

function LibraryDesktopGroup() {
  return (
    <div className="group relative">
      <Button variant="ghost" size="sm" className="nav-pill h-9 gap-1 px-3 text-foreground">
        <span className="text-sm font-semibold">Library</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
      </Button>
      <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 group-focus-within:visible group-hover:visible">
        <div className="flex -translate-y-1 flex-col rounded-2xl border border-border bg-card p-2 opacity-0 shadow-lg transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href="/contents"
            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
          >
            Open the full catalog
            <span className="mt-1 block text-xs font-normal text-muted-foreground">
              Vedas, epics, Puranas, and shelves
            </span>
          </Link>
          <div className="px-3 pb-1 pt-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Featured texts
            </p>
          </div>
          {headerScriptures.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="flex flex-col gap-1 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary/10"
            >
              <span className="text-sm font-semibold text-foreground">{item.name}</span>
              <span className="font-devanagari text-sm text-muted-foreground">{item.sanskrit}</span>
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
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <LanguageMenu language={language} setLanguage={setLanguage} />
      <Button
        variant="outline"
        size="sm"
        className="hidden gap-2 border-border text-foreground sm:inline-flex"
        onClick={onSearch}
        aria-label="Open search dialog"
      >
        <Search className="size-4 text-primary" />
        <span className="text-xs">Search</span>
        <kbd className="hidden rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-flex">
          ⌘K
        </kbd>
      </Button>
      <VoiceSearch onResult={onVoiceSearch} className="hidden 2xl:flex" />
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
          className="hidden gap-2 border-border text-foreground lg:inline-flex"
        >
          <Languages className="size-4 text-primary" />
          <span className="text-xs">{language}</span>
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 rounded-2xl border-border bg-card p-2 text-foreground shadow-lg"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`rounded-xl px-4 py-2 ${language === lang ? "bg-primary/10 text-primary" : ""}`}
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
      className="text-foreground hover:bg-primary/10"
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
          className="text-foreground hover:bg-primary/10 lg:hidden"
        >
          <Menu className="size-5 text-primary" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(22rem,100vw)] max-w-full overflow-y-auto border-border bg-background px-6 py-5 text-foreground"
      >
        <MobileMenuHeader language={language} setLanguage={setLanguage} />
        <div className="mt-6 space-y-7">
          <Button
            variant="outline"
            className="w-full justify-start border-border text-foreground"
            onClick={() => {
              onSearch();
              setOpen(false);
            }}
          >
            <Search className="size-4 text-primary" />
            Search scriptures
          </Button>
          <ScripturesMobileSection onNavigate={handleNavigation} />
          {SITE_NAV_GROUPS.map((group) => (
            <MobileNavSection
              key={group.id}
              title={group.label}
              description={group.description}
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
    <SheetHeader className="border-b border-border pb-5">
      <SheetTitle className="text-left text-xl font-semibold text-primary">Hind AI</SheetTitle>
      <SheetDescription className="text-left text-muted-foreground">
        <span className="font-devanagari tracking-[0.16em]">डिजिटल गुरुकुल</span>
        <div className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-1.5 py-1">
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
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Library</p>
        <p className="mt-1 text-xs text-muted-foreground">Catalog and featured texts</p>
      </div>
      <Link
        href="/contents"
        className="block rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-semibold text-foreground"
        onClick={onNavigate}
      >
        Open the full catalog
      </Link>
      <div className="grid gap-2">
        {headerScriptures.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
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
  description,
  items,
  isActive,
  onNavigate,
}: {
  title: string;
  description: string;
  items: SiteNavItem[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-2xl border px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5 ${
              isActive(item.href) ? "border-primary/50 bg-primary/10" : "border-border bg-card"
            }`}
            onClick={onNavigate}
          >
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
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
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
    <header className="supports-[backdrop-filter]:bg-background/92 sticky top-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 min-w-0 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
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
