"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy Prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-[var(--vp-ink)] bg-[var(--vp-ink)] px-4 py-2 text-xs font-medium uppercase tracking-wide text-[var(--vp-off-white)] transition hover:bg-[var(--vp-coral)] hover:border-[var(--vp-coral)]"
    >
      {copied ? "Copied" : label}
      <span aria-hidden>→</span>
    </button>
  );
}
