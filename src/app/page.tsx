import { getAllPrompts } from "@/lib/prompts";
import {
  AIImproveMarketingSection,
  CategoryGridSection,
  DarkStatementSection,
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
      <DarkStatementSection />
      <LatestPromptsSection prompts={prompts} />
      <section id="about" className="vp-container py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">About</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--vp-muted)]">
          VibePrompt is a prompt studio for turning rough ideas into clear, creative briefs for websites, apps, games, and more. Explore a prompt, shape the details, and use Gemini to prepare it for your favorite AI builder.
        </p>
      </section>
    </>
  );
}
