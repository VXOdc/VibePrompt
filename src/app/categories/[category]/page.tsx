import Link from "next/link";
import { getAllPrompts } from "@/lib/prompts";

type PageProps = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const label = decodeURIComponent(category);
  const prompts = await getAllPrompts();
  const filtered = prompts.filter((p) => p.category.toLowerCase() === label.toLowerCase());

  return (
    <div className="vp-container py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Category</p>
      <h1 className="mt-4 text-5xl font-semibold capitalize tracking-tight">{label}</h1>
      <p className="mt-4 text-[var(--vp-muted)]">{filtered.length} prompts</p>

      <ul className="mt-12 divide-y divide-[var(--vp-border)] border-y border-[var(--vp-border)]">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link href={`/prompts/${p.slug}`} className="block py-5 hover:text-[var(--vp-coral)]">
              <span className="text-lg font-medium">{p.title}</span>
              <p className="mt-1 text-sm text-[var(--vp-muted)]">{p.description}</p>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-sm text-[var(--vp-muted)]">
            No prompts in this category yet.{" "}
            <Link href="/prompts" className="underline">
              Browse all prompts
            </Link>
            .
          </li>
        )}
      </ul>
    </div>
  );
}
