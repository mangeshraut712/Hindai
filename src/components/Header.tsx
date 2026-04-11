"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, BookOpen, Search, Sparkles, Trophy } from "lucide-react";
import { SearchDialog } from "./search";
import { VoiceSearch } from "./voice-search";
import { track } from "@vercel/analytics";

const navItems = [
  { name: "Granthalaya", href: "/contents", subtitle: "Library" },
  { name: "Guru AI", href: "/ai-guide", icon: Sparkles, subtitle: "AI Guide" },
  { name: "Pariksha", href: "/quiz", icon: Trophy, subtitle: "Quiz" },
  { name: "Vinyas", href: "/structure", subtitle: "Structure" },
  { name: "Prastavana", href: "/preface", subtitle: "Preface" },
];

const scriptures = [
  { name: "ऋग्वेद", subtitle: "Rigveda", href: "/rigveda" },
  { name: "महाभारत", subtitle: "Mahabharata", href: "/mahabharata" },
  { name: "रामायण", subtitle: "Ramayana", href: "/ramayana" },
  { name: "श्रीमद्भगवद्गीता", subtitle: "Bhagavad Gita", href: "/bhagavad-gita" },
  { name: "योगसूत्र", subtitle: "Yoga Sutras", href: "/yoga-sutras" },
];

export function Header() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search (⌘K / Ctrl+K)
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
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    track("theme_toggled", { theme: newTheme });
  };

  const handleNavigation = (href: string, label: string) => {
    track("navigation_click", { destination: href, label });
  };

  const handleVoiceSearch = (transcript: string) => {
    // Use the transcript as search query
    // This could be integrated with the search dialog
    track("voice_search_used", { query: transcript });
    setIsSearchOpen(true);
    // The search dialog could be enhanced to accept initial query
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Hind AI - Home"
          onClick={() => handleNavigation("/", "Home")}
        >
          <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-xl font-bold">Hind AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-1"
                aria-label="Browse scriptures"
                aria-haspopup="menu"
              >
                Scriptures <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48" role="menu">
              {scriptures.map((item) => (
                <DropdownMenuItem key={item.name} asChild role="menuitem">
                  <Link href={item.href} onClick={() => handleNavigation(item.href, item.name)}>
                    {item.name}
                    <span className="block text-xs text-muted-foreground">{item.subtitle}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={() => handleNavigation(item.href, item.name)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2" role="toolbar" aria-label="User actions">
          <Button
            variant="ghost"
            size="sm"
            className="hidden items-center gap-2 text-muted-foreground sm:flex"
            onClick={handleSearchClick}
            aria-label="Open search dialog (shortcut: Cmd+K)"
            aria-keyshortcuts="Control+K"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
            <kbd
              className="hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:inline-flex"
              aria-label="Press Command K to search"
            >
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <VoiceSearch onResult={handleVoiceSearch} className="hidden sm:flex" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            aria-pressed={theme === "dark"}
          >
            <Sun
              className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              aria-hidden="true"
            />
            <Moon
              className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              aria-hidden="true"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72"
              id="mobile-menu"
              aria-label="Mobile navigation menu"
            >
              <nav className="flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md p-2 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onClick={() => {
                    setIsOpen(false);
                    handleNavigation("/", "Home");
                  }}
                  aria-label="Hind AI - Home"
                >
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                  Hind AI
                </Link>
                <hr aria-hidden="true" />
                <p className="text-xs font-medium text-muted-foreground" id="scriptures-heading">
                  Scriptures
                </p>
                <ul aria-labelledby="scriptures-heading" role="list">
                  {scriptures.map((item) => (
                    <li key={item.name} role="listitem">
                      <Link
                        href={item.href}
                        className="block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={() => {
                          setIsOpen(false);
                          handleNavigation(item.href, item.name);
                        }}
                      >
                        {item.name}
                        <span className="block text-xs text-muted-foreground">{item.subtitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr aria-hidden="true" />
                <p className="text-xs font-medium text-muted-foreground" id="navigation-heading">
                  Navigation
                </p>
                <ul aria-labelledby="navigation-heading" role="list">
                  {navItems.map((item) => (
                    <li key={item.name} role="listitem">
                      <Link
                        href={item.href}
                        className="block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={() => {
                          setIsOpen(false);
                          handleNavigation(item.href, item.name);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
