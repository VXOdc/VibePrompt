import { WorkspaceClient } from "@/components/workspace-client";

export default function WorkspacePage() {
  return (
    <div className="bg-[var(--vp-navy)] text-[var(--vp-off-white)] min-h-[calc(100vh-3.5rem)]">
      <div className="vp-container py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-beige)]">Vibe coding workspace</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Idea → specification</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Describe what you want to build. VibePrompt helps clarify requirements and generate a Codex-ready prompt you can iterate on.
        </p>
        <div className="mt-12">
          <WorkspaceClient />
        </div>
      </div>
    </div>
  );
}
