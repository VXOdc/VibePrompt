"use client";

import { useState } from "react";
import type { ImprovementMode, ProjectContext } from "@/lib/types";
import { CopyButton } from "./copy-button";
import { PromptEditor } from "./prompt-editor";

const MODES: { id: ImprovementMode; label: string; desc: string }[] = [
  { id: "creative", label: "Creative", desc: "Distinct concepts and rich creative direction" },
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
  const [context, setContext] = useState<ProjectContext>({
    framework: "",
    language: "",
    styling: "",
    deployment: "",
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
          Project context <span className="normal-case tracking-normal">· optional</span>
          <textarea
            className="mt-2 min-h-[120px] w-full border border-[var(--vp-border)] bg-[var(--vp-surface)] p-3 font-mono text-xs"
            placeholder={"framework: Next.js\nlanguage: TypeScript\nadditional: existing project constraints"}
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
            Optional project context helps Gemini tailor the prompt without treating guesses as requirements.
          </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Original</p>
          <PromptEditor value={original} onChange={setOriginal} dark={false} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Improved</p>
            {improved && <CopyButton text={improved} label="Copy" />}
          </div>
          <PromptEditor value={improved} onChange={setImproved} label="Gemini output" />
        </div>
      </div>

      {error && <p className="text-sm text-[var(--vp-coral)]">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading || !original.trim()}
          onClick={runImprove}
          className="border border-[var(--vp-coral)] bg-[var(--vp-coral)] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white disabled:opacity-40"
        >
          {loading ? "Improving…" : "Improve with Gemini →"}
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
