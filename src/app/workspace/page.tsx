import { WorkspaceClient } from "@/components/workspace-client";

export default function WorkspacePage() {
  return (
    <div className="bg-[var(--vp-navy)] text-[var(--vp-off-white)] min-h-[calc(100vh-3.5rem)]">
      <div className="vp-container py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-beige)]">Prompt studio · Gemini</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Make something unexpected.</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Start with a half-formed idea. Shape it into a clear, imaginative prompt for a website, app, game, story, or whatever you want to make.
        </p>
        <div className="mt-12">
          <WorkspaceClient />
        </div>
      </div>
    </div>
  );
}
