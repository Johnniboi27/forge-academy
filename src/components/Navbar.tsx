"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { SearchBar } from "@/components/SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/pathway", label: "Engineering Pathway" },
  { href: "/practice", label: "Practice" },
  { href: "/formulas", label: "Formula Library" },
  { href: "/sources", label: "OCW Sources" }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-forge-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-white">
          <span className="rounded-lg border border-red-900/70 bg-red-950/40 p-2 text-red-200">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-semibold tracking-wide">Forge Academy</span>
        </Link>
        <div className="hidden flex-1 justify-center lg:flex">
          <SearchBar />
        </div>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="ml-auto rounded-md border border-zinc-800 p-2 text-zinc-200 xl:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-zinc-900 px-4 pb-4 xl:hidden">
          <div className="mx-auto max-w-7xl space-y-4">
            <SearchBar />
            <nav className="grid gap-2 sm:grid-cols-2" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition",
                    pathname === link.href
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
