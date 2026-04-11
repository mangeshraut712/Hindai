"use client";

import Link from "next/link";
import { BookOpen, Github, Heart } from "lucide-react";

const footerLinks = {
  scriptures: [
    { name: "Rigveda", href: "/rigveda" },
    { name: "Mahabharata", href: "/mahabharata" },
    { name: "Ramayana", href: "/ramayana" },
    { name: "Bhagavad Gita", href: "/bhagavad-gita" },
  ],
  resources: [
    { name: "Library", href: "/contents" },
    { name: "Structure", href: "/structure" },
    { name: "Preface", href: "/preface" },
  ],
  legal: [
    { name: "License", href: "/license" },
    { name: "Attributions", href: "/attributions" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Hind AI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-Powered Digital Library of Ancient Indian Scriptures
            </p>
          </div>

          {/* Scriptures */}
          <div>
            <h3 className="text-sm font-semibold">Scriptures</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.scriptures.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hind AI. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for
            preserving ancient wisdom
          </p>
          <Link
            href="https://github.com/hindai/hindai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
