"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/prompts", label: "Prompts" },
  { href: "/prompts", label: "Explore" },
  { href: "/improve", label: "Improve" },
  { href: "/workspace", label: "Workspace" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)]">
      <div className="vp-container flex h-14 items-center justify-between gap-6">
        <Link href="/" className="font-mono text-xs font-medium tracking-[0.22em] text-[var(--vp-ink)]">
          VIBEPROMPT
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={`text-sm transition-colors hover:text-[var(--vp-coral)] ${
                pathname === link.href ? "text-[var(--vp-ink)]" : "text-[var(--vp-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/prompts" className="font-mono text-xs text-[var(--vp-muted)] hover:text-[var(--vp-ink)]">
            ⌕ Search
          </Link>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 border border-[var(--vp-ink)] px-3 py-1.5 text-xs font-medium uppercase tracking-wide hover:bg-[var(--vp-ink)] hover:text-[var(--vp-off-white)]"
          >
            Get Started
            <span aria-hidden>↗</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-[var(--vp-ink)]" />
          <span className="h-px w-6 bg-[var(--vp-ink)]" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--vp-border)] px-[var(--vp-gutter)] py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="text-2xl font-medium tracking-tight" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/prompts" className="font-mono text-sm" onClick={() => setOpen(false)}>
                Search prompts
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
