import { AIImprover } from "@/components/ai-improver";
import { getPromptBySlug } from "@/lib/prompts";

type PageProps = { searchParams: Promise<{ prompt?: string }> };

export default async function ImprovePage({ searchParams }: PageProps) {
  const { prompt: slug } = await searchParams;
  let initial = "";
  if (slug) {
    const record = await getPromptBySlug(slug);
    if (record) initial = record.body;
  }

  return (
    <div className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)]">
      <div className="vp-container py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Mistral</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight">Improve a prompt</h1>
        <p className="mt-4 max-w-2xl text-[var(--vp-muted)]">
          Original prompts are never silently overwritten. Compare versions, copy either, and choose how aggressive the rewrite should be.
        </p>
        <div className="mt-12">
          <AIImprover initialPrompt={initial || "Build me a dashboard for my project."} />
        </div>
      </div>
    </div>
  );
}
