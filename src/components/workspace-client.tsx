"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";
import { PromptEditor } from "./prompt-editor";

const STARTERS = [
  "A neighborhood record shop with a listening lounge and a beautifully searchable collection",
  "A tiny space agency that lets kids plan a mission to an imaginary moon",
  "A calm meal-planning tool for people who want to waste less food",
  "An interactive field guide to strange plants found on another planet",
];

const TYPES = ["Website", "Web app", "Mobile app", "Game", "Brand concept", "Story", "Something else"];

export function WorkspaceClient() {
  const [idea, setIdea] = useState("");
  const [projectType, setProjectType] = useState("Website");
  const [direction, setDirection] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: idea.trim(),
          mode: "creative",
          userInstructions: `Create a ready-to-use prompt for a ${projectType.toLowerCase()}.${direction.trim() ? ` Creative direction from the user: ${direction.trim()}` : " Develop a fresh, specific creative direction that fits the idea."} Preserve the user's explicit constraints. For websites and apps, cover the audience, key user journey, page structure, visual language, responsive layout, accessible interactions, real content, and functional states. For other project types, adapt the brief to the medium instead of forcing web design requirements.`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Prompt generation failed.");
      setDraft(data.improved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-white/15">
      <div className="grid md:grid-cols-2">
        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">What are we making?</span>
              <select
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
                className="mt-2 w-full border border-white/20 bg-[var(--vp-navy)] px-3 py-2.5 text-sm text-[var(--vp-off-white)] outline-none focus:border-[var(--vp-coral)]"
              >
                {TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setIdea(STARTERS[Math.floor(Math.random() * STARTERS.length)])}
              className="min-h-10 border border-white/20 px-3 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-off-white)] transition hover:border-[var(--vp-coral)] hover:text-[var(--vp-coral)]"
            >
              Surprise me
            </button>
          </div>

          <label className="mt-7 block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">The seed of an idea</span>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              maxLength={12000}
              placeholder="A website for a night market where every stall tells the story of a family recipe…"
              className="mt-2 min-h-36 w-full resize-y border border-white/20 bg-black/10 p-3 text-sm leading-relaxed text-[var(--vp-off-white)] outline-none placeholder:text-white/35 focus:border-[var(--vp-coral)]"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Mood, audience, or must-haves <span className="normal-case tracking-normal opacity-70">· optional</span></span>
            <input
              value={direction}
              onChange={(event) => setDirection(event.target.value)}
              placeholder="Warm and tactile, for curious families; avoid account sign-up"
              className="mt-2 w-full border border-white/20 bg-black/10 px-3 py-2.5 text-sm text-[var(--vp-off-white)] outline-none placeholder:text-white/35 focus:border-[var(--vp-coral)]"
            />
          </label>

          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Need a first spark?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STARTERS.slice(0, 3).map((starter, index) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => setIdea(starter)}
                  className="border border-white/15 px-2.5 py-1.5 text-left text-xs text-white/75 transition hover:border-[var(--vp-coral)] hover:text-white"
                >
                  Idea {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black/20 p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Your prompt</p>
            {draft && <CopyButton text={draft} label="Copy" />}
          </div>
          <PromptEditor value={draft} onChange={setDraft} label={draft ? "Generated prompt · editable" : undefined} />
          {!draft && <p className="mt-3 text-xs text-white/50">Your finished prompt will appear here. You can edit it before copying.</p>}
        </div>
      </div>

      {error && <p role="alert" className="border-t border-white/10 px-6 py-3 text-sm text-[var(--vp-coral)]">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-4 md:px-6">
        <p className="font-mono text-[10px] text-white/50">A clear idea is enough. Gemini can help shape the rest.</p>
        <button
          type="button"
          disabled={loading || !idea.trim()}
          onClick={generate}
          className="border border-[var(--vp-coral)] bg-[var(--vp-coral)] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-[var(--vp-ink)] transition hover:border-[var(--vp-off-white)] hover:bg-[var(--vp-off-white)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Imagining…" : "Create my prompt →"}
        </button>
      </div>
    </div>
  );
}
