import Link from "next/link";
import { notFound } from "next/navigation";
import { AIImprover } from "@/components/ai-improver";
import { CopyButton } from "@/components/copy-button";
import { PromptEditor } from "@/components/prompt-editor";
import { getAllPrompts, getPromptBySlug, getRelatedPrompts } from "@/lib/prompts";

type PageProps = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  const prompts = await getAllPrompts();
  return prompts.map((p) => ({ slug: p.slug.split("/") }));
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { slug: parts } = await params;
  const slug = parts.join("/");
  const prompt = await getPromptBySlug(slug);
  if (!prompt) notFound();

  const all = await getAllPrompts();
  const related = getRelatedPrompts(all, prompt);

  return (
    <div className="bg-[var(--vp-off-white)]">
      <div className="vp-container border-b border-[var(--vp-border)] py-16 md:py-20">
        <Link href="/prompts" className="font-mono text-xs uppercase tracking-widest text-[var(--vp-muted)] hover:text-[var(--vp-coral)]">
          ← Library
        </Link>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">{prompt.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--vp-muted)]">{prompt.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">
          <span>{prompt.category}</span>
          <span>·</span>
          <span>{prompt.difficulty}</span>
          <span>·</span>
          <span>{prompt.agents.join(" · ")}</span>
          {prompt.tags.map((t) => (
            <span key={t} className="border border-[var(--vp-border)] px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CopyButton text={prompt.body} />
          <Link href={`/improve?prompt=${encodeURIComponent(slug)}`} className="vp-btn-ghost">
            Improve with AI
          </Link>
        </div>
      </div>

      <div className="vp-container grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Prompt</p>
          <PromptEditor value={prompt.body} readOnly dark={false} className="min-h-[480px]" />
        </div>
        <aside className="lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Related</p>
          <ul className="mt-4 divide-y divide-[var(--vp-border)] border-y border-[var(--vp-border)]">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/prompts/${r.slug}`} className="block py-4 text-sm font-medium hover:text-[var(--vp-coral)]">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="border-t border-[var(--vp-border)] bg-[var(--vp-surface)] py-16">
        <div className="vp-container">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Improve this prompt</p>
          <div className="mt-8">
            <AIImprover initialPrompt={prompt.body} />
          </div>
        </div>
      </div>
    </div>
  );
}
