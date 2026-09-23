"use client";

import { useState } from "react";
import type { ImprovementMode, ImproveResponse, ProjectContext } from "@/lib/types";
import { PromptEditor } from "./prompt-editor";

const MODES: { id: ImprovementMode; label: string; desc: string }[] = [
  { id: "quick", label: "Quick Improve", desc: "Small clarity fixes, same intent" },
  { id: "developer", label: "Developer Improve", desc: "Requirements, constraints, acceptance" },
  { id: "codex", label: "Codex Optimize", desc: "Agent-ready structured specification" },
];

export function AIImprover({ initialPrompt = "" }: { initialPrompt?: string }) {
  const [original, setOriginal] = useState(initialPrompt);
  const [improved, setImproved] = useState("");
  const [mode, setMode] = useState<ImprovementMode>("codex");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Pick<ImproveResponse, "changes" | "missing" | "suggestions"> | null>(null);
  const [context, setContext] = useState<ProjectContext>({
    framework: "Next.js",
    language: "TypeScript",
    styling: "Tailwind CSS",
    deployment: "Vercel",
  });

  async function runImprove() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: original, mode, projectContext: context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Improvement failed");
      setImproved(data.improved);
      setMeta({ changes: data.changes, missing: data.missing, suggestions: data.suggestions });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`border px-3 py-2 text-left text-xs transition ${
              mode === m.id
                ? "border-[var(--vp-ink)] bg-[var(--vp-ink)] text-[var(--vp-off-white)]"
                : "border-[var(--vp-border)] bg-transparent text-[var(--vp-muted)] hover:border-[var(--vp-ink)]"
            }`}
          >
            <span className="block font-medium uppercase tracking-wide">{m.label}</span>
            <span className="mt-1 block font-mono text-[10px] normal-case opacity-80">{m.desc}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 border border-[var(--vp-border)] p-4 md:grid-cols-2">
        <label className="block text-xs font-mono uppercase tracking-widest text-[var(--vp-muted)]">
          Project context
          <textarea
            className="mt-2 min-h-[120px] w-full border border-[var(--vp-border)] bg-[var(--vp-surface)] p-3 font-mono text-xs"
            value={Object.entries(context)
              .filter(([, v]) => v)
              .map(([k, v]) => `${k}: ${v}`)
              .join("\n")}
            onChange={(e) => {
              const lines = e.target.value.split("\n");
              const next: ProjectContext = {};
              for (const line of lines) {
                const [key, ...rest] = line.split(":");
                if (!key?.trim()) continue;
                const val = rest.join(":").trim();
                const k = key.trim().toLowerCase();
                if (k === "framework") next.framework = val;
                else if (k === "language") next.language = val;
                else if (k === "styling") next.styling = val;
                else if (k === "deployment") next.deployment = val;
                else if (k === "database") next.database = val;
                else if (k === "authentication") next.authentication = val;
                else next.additional = (next.additional ? `${next.additional}\n` : "") + line;
              }
              setContext(next);
            }}
          />
        </label>
        <p className="text-sm leading-relaxed text-[var(--vp-muted)]">
          Optional project context helps Mistral adapt the prompt without inventing requirements. Paste additional notes in the context field.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Original</p>
          <PromptEditor value={original} onChange={setOriginal} dark={false} />
        </div>
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Improved</p>
          <PromptEditor value={improved} onChange={setImproved} label="Mistral output" />
        </div>
      </div>

      {meta && (
        <div className="grid gap-4 md:grid-cols-3">
          {(["changes", "missing", "suggestions"] as const).map((key) => (
            <div key={key} className="border border-[var(--vp-border)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">{key}</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--vp-ink)]">
                {meta[key].map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-[var(--vp-coral)]">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading || !original.trim()}
          onClick={runImprove}
          className="border border-[var(--vp-coral)] bg-[var(--vp-coral)] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white disabled:opacity-40"
        >
          {loading ? "Improving…" : "Improve with Mistral →"}
        </button>
        <button
          type="button"
          onClick={() => {
            setImproved(original);
          }}
          className="border border-[var(--vp-border)] px-4 py-2.5 text-xs uppercase tracking-wide"
        >
          Restore original
        </button>
        {improved && (
          <button
            type="button"
            onClick={() => setOriginal(improved)}
            className="border border-[var(--vp-border)] px-4 py-2.5 text-xs uppercase tracking-wide"
          >
            Use improved in editor
          </button>
        )}
      </div>
    </div>
  );
}
