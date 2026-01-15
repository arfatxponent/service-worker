// components/header.tsx
"use client";

import Link from "next/link";
import { MegaMenu } from "@/components/mega-menu";
import { MobileMenu } from "@/components/mobile-menu";
import { megaMenuData } from "@/lib/constants/menu-data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - Left Side */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Logo />
          <span className="text-xl font-bold tracking-tight">Arfat</span>
        </Link>

        {/* Desktop Navigation - Right Side */}
        <nav className="hidden items-center gap-2 md:flex">
          <MegaMenu data={megaMenuData} />
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu data={megaMenuData} />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    </div>
  );
}
