"use client";

import { useState } from "react";
import { PromptEditor } from "./prompt-editor";

export function WorkspaceClient() {
  const [idea, setIdea] = useState("Build a website for my cybersecurity club.");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: idea,
          mode: "codex",
          userInstructions: "Transform this product idea into an implementation-ready coding agent prompt. Ask for missing info in the missing field, not in the prompt body.",
          projectContext: {
            framework: "Next.js",
            language: "TypeScript",
            styling: "Tailwind CSS",
            deployment: "Vercel",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDraft(data.improved);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-white/15">
      <div className="grid md:grid-cols-2">
        <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Your idea</p>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="mt-4 min-h-[200px] w-full bg-transparent font-mono text-sm leading-relaxed outline-none"
          />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Project</p>
          <ul className="mt-3 space-y-1 font-mono text-xs text-white/75">
            <li>Framework: Next.js</li>
            <li>Language: TypeScript</li>
            <li>Deploy: Vercel</li>
            <li>Repo: GitHub</li>
          </ul>
        </div>
        <div className="bg-black/20 p-6">
          <PromptEditor value={draft} onChange={setDraft} label="Generated prompt" />
        </div>
      </div>
      <div className="border-t border-white/10 p-4 text-center">
        <button
          type="button"
          disabled={loading || !idea.trim()}
          onClick={generate}
          className="font-mono text-xs uppercase tracking-widest text-[var(--vp-coral)] disabled:opacity-40"
        >
          {loading ? "Generating…" : "Improve with Mistral →"}
        </button>
      </div>
    </div>
  );
}
