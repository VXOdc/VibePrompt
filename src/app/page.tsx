import { getAllPrompts } from "@/lib/prompts";
import {
  AIImproveMarketingSection,
  CategoryGridSection,
  DarkStatementSection,
  EditorialImageSection,
  ExploreLibrarySection,
  FeaturedPromptSection,
  HeroSection,
  LatestPromptsSection,
  WorkflowSection,
  WorkspacePreviewSection,
} from "@/components/home-sections";

export default async function HomePage() {
  const prompts = await getAllPrompts();
  const featured = prompts.find((p) => p.slug.includes("build-nextjs")) ?? prompts[0] ?? null;

  return (
    <>
      <HeroSection />
      <FeaturedPromptSection featured={featured} />
      <ExploreLibrarySection />
      <AIImproveMarketingSection />
      <CategoryGridSection />
      <WorkflowSection />
      <WorkspacePreviewSection />
      <EditorialImageSection />
      <DarkStatementSection />
      <LatestPromptsSection prompts={prompts} />
      <section id="about" className="vp-container py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">About</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--vp-muted)]">
          VibePrompt is a prompt engineering workspace built for vibe coding — a library first, with Mistral-powered improvement as the enhancement layer. Find a prompt, customize it, improve it, copy it, use it with Codex.
        </p>
      </section>
    </>
  );
}
