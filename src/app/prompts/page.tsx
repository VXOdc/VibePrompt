import Link from "next/link";
import { PromptLibraryClient } from "@/components/prompt-library-client";
import { getAllPrompts, getCategories } from "@/lib/prompts";

export default async function PromptsPage() {
  const prompts = await getAllPrompts();
  const categories = getCategories(prompts);

  return (
    <div className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)]">
      <div className="vp-container py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Library</p>
        <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight md:text-6xl">Browse prompts</h1>
        <p className="mt-4 max-w-xl text-[var(--vp-muted)]">
          Search by title, tags, technology, or agent. Copy any prompt or open the improver.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/categories/${encodeURIComponent(c.name.toLowerCase())}`}
              className="border border-[var(--vp-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest hover:border-[var(--vp-ink)]"
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <PromptLibraryClient initialPrompts={prompts} />
        </div>
      </div>
    </div>
  );
}
