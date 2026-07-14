"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { IconBrandTabler, IconMenu2, IconX } from "@tabler/icons-react"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Sources", href: "#sources" },
  { label: "Pricing", href: "#pricing" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-linear-to-br from-primary to-primary/50 flex items-center justify-center shadow-glow-article">
            <IconBrandTabler className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">BlogDrop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="text-sm font-medium px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 transition-all"
          >
            Get Early Access
          </a>
        </nav>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 transition-all text-center mt-2"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
