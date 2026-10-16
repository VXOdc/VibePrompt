"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PromptRecord } from "@/lib/types";

export function PromptLibraryClient({ initialPrompts }: { initialPrompts: PromptRecord[] }) {
  const [query, setQuery] = useState("");
  const [agent, setAgent] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialPrompts.filter((p) => {
      if (agent && !p.agents.some((a) => a.toLowerCase().includes(agent.toLowerCase()))) return false;
      if (!q) return true;
      const hay = [p.title, p.description, p.category, p.body, ...p.tags, ...(p.technologies ?? []), ...p.agents]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [initialPrompts, query, agent]);

  return (
    <div>
      <div className="grid gap-4 border border-[var(--vp-border)] p-4 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="authentication, next.js, refactor…"
            className="mt-2 w-full border border-[var(--vp-border)] bg-[var(--vp-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--vp-ink)]"
          />
        </label>
        <label className="block md:min-w-[180px]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Agent</span>
          <select
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            className="mt-2 w-full border border-[var(--vp-border)] bg-[var(--vp-surface)] px-3 py-2 text-sm outline-none"
          >
            <option value="">All</option>
            <option value="Codex">Codex</option>
            <option value="Cursor">Cursor</option>
            <option value="General">General</option>
          </select>
        </label>
      </div>

      <ul className="mt-8 divide-y divide-[var(--vp-border)] border-y border-[var(--vp-border)]">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link href={`/prompts/${p.slug}`} className="group grid gap-3 py-6 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--vp-coral)]">{p.title}</h2>
                <p className="mt-2 text-sm text-[var(--vp-muted)]">{p.description}</p>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)] md:col-span-3">
                {p.category} · {p.difficulty}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)] md:col-span-4 md:text-right">
                {p.agents.join(" · ")}
              </div>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-sm text-[var(--vp-muted)]">No prompts match your search.</li>
        )}
      </ul>
    </div>
  );
}
