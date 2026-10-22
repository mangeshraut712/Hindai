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
import { publicUrl } from "@/lib/site";

function BrandLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2"
      onClick={onNavigate}
      aria-label="Hind AI home"
    >
      <div className="border-primary/30 from-primary/10 to-primary/5 relative size-9 shrink-0 overflow-hidden rounded-full border bg-linear-to-br sm:size-10">
        <Image
          src={publicUrl("/logo.webp")}
          alt="Hind AI"
          width={40}
          height={40}
          className="size-full object-cover"
          priority
          unoptimized
        />
      </div>
      <span className="min-w-0 leading-tight">
        <span className="text-foreground group-hover:text-primary block text-[15px] font-semibold sm:text-base">
          Hind AI
        </span>
        <span className="font-devanagari text-muted-foreground block text-[10px] sm:text-[11px]">
          डिजिटल गुरुकुल
        </span>
      </span>
    </Link>
  );
}

function DesktopMenu() {
  return (
    <nav
      className="border-border bg-card hidden min-w-0 items-center gap-0.5 overflow-visible rounded-2xl border px-1.5 py-1 lg:flex"
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
        className="nav-pill text-foreground h-9 gap-1 px-3"
        aria-haspopup="true"
      >
        <span className="text-sm font-semibold">{group.label}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
      </Button>
      <div
        className={`invisible absolute top-full z-50 w-72 pt-2 group-focus-within:visible group-hover:visible ${alignment}`}
      >
        <div className="border-border bg-card flex -translate-y-1 flex-col rounded-2xl border p-2 opacity-0 shadow-lg transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-muted-foreground px-3 pt-1 pb-2 text-[11px] tracking-[0.16em] uppercase">
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
      className="text-foreground hover:bg-primary/10 focus-visible:bg-primary/10 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors focus-visible:outline-hidden"
    >
      <item.icon className="text-primary mt-0.5 size-4 shrink-0" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{item.label}</span>
        <span className="text-muted-foreground block text-xs">{item.hint}</span>
      </span>
    </Link>
  );
}

function LibraryDesktopGroup() {
  return (
    <div className="group relative">
      <Button variant="ghost" size="sm" className="nav-pill text-foreground h-9 gap-1 px-3">
        <span className="text-sm font-semibold">Library</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
      </Button>
      <div className="invisible absolute top-full left-0 z-50 w-80 pt-2 group-focus-within:visible group-hover:visible">
        <div className="border-border bg-card flex -translate-y-1 flex-col rounded-2xl border p-2 opacity-0 shadow-lg transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href="/contents"
            className="text-foreground hover:bg-primary/10 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
          >
            Open the full catalog
            <span className="text-muted-foreground mt-1 block text-xs font-normal">
              Vedas, epics, Puranas, and shelves
            </span>
          </Link>
          <div className="px-3 pt-2 pb-1">
            <p className="text-muted-foreground text-[11px] tracking-[0.16em] uppercase">
              Featured texts
            </p>
          </div>
          {headerScriptures.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="hover:bg-primary/10 flex flex-col gap-1 rounded-xl px-3 py-2.5 transition-colors"
            >
              <span className="text-foreground text-sm font-semibold">{item.name}</span>
              <span className="font-devanagari text-muted-foreground text-sm">{item.sanskrit}</span>
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
        className="border-border text-foreground hidden gap-2 sm:inline-flex"
        onClick={onSearch}
        aria-label="Open search dialog"
      >
        <Search className="text-primary size-4" />
        <span className="text-xs">Search</span>
        <kbd className="border-border bg-muted text-muted-foreground hidden rounded-full border px-2 py-0.5 text-[10px] font-medium lg:inline-flex">
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
          className="border-border text-foreground hidden gap-2 lg:inline-flex"
        >
          <Languages className="text-primary size-4" />
          <span className="text-xs">{language}</span>
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-border bg-card text-foreground w-40 rounded-2xl p-2 shadow-lg"
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
      <Sun className="text-primary size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="text-primary absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
          <Menu className="text-primary size-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-border bg-background text-foreground flex h-full w-[min(22rem,100vw)] max-w-full flex-col overflow-y-auto px-4 py-4 sm:px-5"
      >
        {open ? (
          <>
            <MobileMenuHeader language={language} setLanguage={setLanguage} />
            <div className="mt-4 space-y-5 pb-6">
              <Button
                variant="outline"
                className="border-border text-foreground w-full justify-start"
                onClick={() => {
                  onSearch();
                  setOpen(false);
                }}
              >
                <Search className="text-primary size-4" />
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
          </>
        ) : null}
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
    <SheetHeader className="border-border border-b pb-5">
      <SheetTitle className="text-primary text-left text-xl font-semibold">Hind AI</SheetTitle>
      <SheetDescription className="text-muted-foreground text-left">
        <span className="font-devanagari tracking-[0.16em]">डिजिटल गुरुकुल</span>
        <div className="border-border bg-card mt-3 flex w-fit items-center gap-1.5 rounded-full border px-1.5 py-1">
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
    <div className="space-y-2">
      <div>
        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
          Library
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-5">Catalog and featured texts</p>
      </div>
      <Link
        href="/contents"
        className="border-primary/40 bg-primary/10 text-foreground block rounded-xl border px-3 py-2.5 text-sm font-semibold"
        onClick={onNavigate}
      >
        Open the full catalog
      </Link>
      <div className="grid gap-1.5">
        {headerScriptures.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="border-border bg-card hover:border-primary/40 hover:bg-primary/5 rounded-xl border px-3 py-2 transition-colors"
            onClick={onNavigate}
          >
            <p className="font-devanagari text-primary text-sm leading-5">{item.sanskrit}</p>
            <p className="text-foreground text-sm leading-5 font-semibold">{item.name}</p>
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
    <div className="space-y-2">
      <div>
        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
          {title}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-5">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:border-primary/40 hover:bg-primary/5 rounded-xl border px-3 py-2 transition-colors ${
              isActive(item.href) ? "border-primary/50 bg-primary/10" : "border-border bg-card"
            }`}
            onClick={onNavigate}
          >
            <p className="text-foreground text-sm leading-5 font-semibold">{item.label}</p>
            <p className="text-muted-foreground mt-0.5 text-xs leading-4">{item.hint}</p>
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
    <header className="supports-backdrop-filter:bg-background/92 border-border bg-background/95 text-foreground sticky top-0 z-50 border-b backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-7xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
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
