import Link from "next/link";
import type { PromptRecord } from "@/lib/types";
import { CopyButton } from "./copy-button";

const EXPLORE = [
  { n: "01", title: "Frontend", desc: "Build interfaces with AI coding agents" },
  { n: "02", title: "Backend", desc: "APIs, services and architecture" },
  { n: "03", title: "Debugging", desc: "Find and fix difficult problems" },
  { n: "04", title: "Cybersecurity", desc: "Security-focused development prompts" },
];

const WORKFLOW = [
  { n: "01", title: "Discover", desc: "Find a starting prompt." },
  { n: "02", title: "Refine", desc: "Customize it to your project." },
  { n: "03", title: "Improve", desc: "Mistral restructures the instruction." },
  { n: "04", title: "Build", desc: "Paste it into Codex." },
  { n: "05", title: "Ship", desc: "Code on GitHub, deploy on Vercel." },
];

const CATEGORY_TILES = [
  "Frontend", "Backend", "React", "Next.js", "Python", "APIs",
  "Cybersecurity", "DevOps", "Databases", "Debugging",
];

export function HeroSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)]">
      <div className="vp-container grid min-h-[min(88vh,900px)] grid-cols-1 gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7 md:pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--vp-muted)]">Prompt library</p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-tight">
            PROMPTS
            <br />
            FOR THE
            <br />
            <span className="text-[var(--vp-coral)]">VIBE CODING</span>
            <br />
            GENERATION.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--vp-muted)]">
            Turn ideas into structured instructions for AI coding agents.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/prompts" className="vp-btn-primary">Explore Prompts</Link>
            <Link href="/improve" className="vp-btn-ghost">Improve a Prompt</Link>
          </div>
        </div>
        <aside className="flex flex-col justify-end md:col-span-5 md:border-l md:border-[var(--vp-border)] md:pl-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Stack</p>
          <ul className="mt-4 space-y-3 font-mono text-sm">
            <li>Next.js · TypeScript · Tailwind</li>
            <li>Mistral · Codex · Cursor</li>
            <li>GitHub · Vercel</li>
          </ul>
          <p className="mt-12 max-w-xs text-sm leading-relaxed text-[var(--vp-muted)]">
            Maximum useful specificity with minimum unnecessary complexity.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function FeaturedPromptSection({ featured }: { featured: PromptRecord | null }) {
  if (!featured) return null;
  const preview = featured.body.split("\n").slice(0, 14).join("\n");

  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-beige)]">
      <div className="vp-container grid gap-0 md:grid-cols-2">
        <div className="flex flex-col justify-center border-b border-[var(--vp-border)] py-16 md:border-b-0 md:border-r md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Featured prompt</p>
          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--vp-muted)]">{featured.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/prompts/${featured.slug}`} className="vp-btn-primary">Open prompt</Link>
            <CopyButton text={featured.body} />
          </div>
        </div>
        <div className="bg-[var(--vp-ink)] p-6 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">
            {featured.agents.join(" / ")} · {featured.category}
          </p>
          <pre className="mt-6 overflow-x-auto font-mono text-xs leading-relaxed text-[var(--vp-off-white)]/90 whitespace-pre-wrap">
            {preview}
          </pre>
          <p className="mt-8 text-right font-mono text-xs uppercase tracking-widest text-[var(--vp-coral)]">
            Copy prompt →
          </p>
        </div>
      </div>
    </section>
  );
}

export function ExploreLibrarySection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)] py-20 md:py-28">
      <div className="vp-container">
        <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-[var(--vp-muted)]">Explore the library</h2>
        <div className="mt-12 grid gap-px bg-[var(--vp-border)] md:grid-cols-12 md:grid-rows-2">
          {EXPLORE.map((item, i) => (
            <Link
              key={item.title}
              href={`/categories/${item.title.toLowerCase()}`}
              className={`group bg-[var(--vp-off-white)] p-8 transition hover:bg-[var(--vp-surface)] ${
                i === 0 ? "md:col-span-5 md:row-span-2 md:min-h-[320px]" : "md:col-span-7 md:min-h-[160px]"
              }`}
            >
              <span className="font-mono text-xs text-[var(--vp-coral)]">{item.n}</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight group-hover:text-[var(--vp-coral)]">{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm text-[var(--vp-muted)]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AIImproveMarketingSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-coral)] py-20 text-[var(--vp-ink)] md:py-28">
      <div className="vp-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-tight">
            YOUR PROMPT.
            <br />
            OUR SECOND PASS.
          </h2>
        </div>
        <div className="grid gap-6 lg:col-span-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          <div className="border border-black/15 bg-black/5 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest">Original</p>
            <p className="mt-4 font-mono text-sm">Build me a dashboard.</p>
          </div>
          <p className="text-center font-mono text-xl">↓</p>
          <div className="border border-black/15 bg-black/10 p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest">Mistral</p>
            <ul className="mt-4 space-y-2 font-mono text-xs">
              <li>Analyzing intent</li>
              <li>Expanding requirements</li>
              <li>Structuring implementation</li>
            </ul>
          </div>
          <p className="text-center font-mono text-xl">↓</p>
          <div className="border border-black/20 bg-[var(--vp-ink)] p-6 text-[var(--vp-off-white)]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Improved</p>
            <p className="mt-4 font-mono text-xs leading-relaxed">
              Build a responsive Next.js dashboard using TypeScript, with defined routes, data models, and acceptance criteria…
            </p>
          </div>
        </div>
        <div className="lg:col-span-12">
          <Link href="/improve" className="inline-flex border border-[var(--vp-ink)] bg-[var(--vp-ink)] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-[var(--vp-off-white)]">
            Open improver →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CategoryGridSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-muted-blue)]/15 py-20 md:py-24">
      <div className="vp-container">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Prompt categories</h2>
        <div className="mt-10 grid grid-cols-2 gap-px bg-[var(--vp-border)] md:grid-cols-4 lg:grid-cols-5">
          {CATEGORY_TILES.map((name, i) => (
            <Link
              key={name}
              href={`/categories/${name.toLowerCase().replace(/\./g, "")}`}
              className="group bg-[var(--vp-off-white)] p-6 transition hover:bg-[var(--vp-surface)]"
            >
              <span className="font-mono text-[10px] text-[var(--vp-coral)]">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-lg font-semibold tracking-tight group-hover:text-[var(--vp-coral)]">{name}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)]">Explore →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)] py-20">
      <div className="vp-container">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Codex workflow</h2>
        <ol className="mt-12 flex flex-col gap-8 md:flex-row md:gap-0 md:divide-x md:divide-[var(--vp-border)]">
          {WORKFLOW.map((step) => (
            <li key={step.n} className="md:flex-1 md:px-6 md:first:pl-0 md:last:pr-0">
              <span className="font-mono text-sm text-[var(--vp-coral)]">{step.n}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--vp-muted)]">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WorkspacePreviewSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-navy)] py-20 text-[var(--vp-off-white)]">
      <div className="vp-container">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Workspace</p>
        <div className="mt-8 border border-white/15">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Project</p>
              <ul className="mt-4 space-y-2 font-mono text-sm">
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Vercel</li>
                <li>GitHub</li>
              </ul>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Context</p>
              <p className="mt-4 text-sm text-white/70">Paste architecture notes, constraints, or repo summary.</p>
            </div>
            <div className="bg-black/25 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Prompt</p>
              <pre className="mt-4 font-mono text-xs leading-relaxed text-white/85">{`# Objective\n\nBuild a production-ready feature…`}</pre>
            </div>
          </div>
          <div className="border-t border-white/10 p-4 text-center">
            <Link href="/workspace" className="font-mono text-xs uppercase tracking-widest text-[var(--vp-coral)]">
              Improve with Mistral →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialImageSection() {
  return (
    <section className="relative border-b border-[var(--vp-border)] bg-[var(--vp-ink)] py-32 md:py-40">
      <div className="vp-container relative z-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Technical imagery</p>
        <p className="mt-6 max-w-lg text-2xl font-medium leading-snug text-[var(--vp-off-white)]">
          Monochrome hardware, architecture, and code-forward photography — not stock laptop clichés.
        </p>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,85,72,0.15) 50%, transparent 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 48px)",
        }}
      />
    </section>
  );
}

export function DarkStatementSection() {
  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-ink)] py-24 text-[var(--vp-off-white)] md:py-32">
      <div className="vp-container grid gap-10 md:grid-cols-12 md:items-end">
        <h2 className="md:col-span-8 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
          THE BETTER THE INSTRUCTION,
          <br />
          THE BETTER THE BUILD.
        </h2>
        <div className="md:col-span-4 md:text-right">
          <p className="text-sm leading-relaxed text-white/65">
            VibePrompt helps turn vague ideas into executable specifications for coding agents.
          </p>
          <Link href="/prompts" className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-[var(--vp-coral)]">
            Explore →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LatestPromptsSection({ prompts }: { prompts: PromptRecord[] }) {
  const latest = prompts.slice(0, 6);

  return (
    <section className="border-b border-[var(--vp-border)] bg-[var(--vp-off-white)] py-20">
      <div className="vp-container">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--vp-muted)]">Latest prompts</h2>
        <ul className="mt-10 divide-y divide-[var(--vp-border)] border-y border-[var(--vp-border)]">
          {latest.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/prompts/${p.slug}`} className="group grid gap-4 py-5 md:grid-cols-12 md:items-center">
                <span className="font-mono text-xs text-[var(--vp-coral)] md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium group-hover:text-[var(--vp-coral)] md:col-span-5">{p.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-muted)] md:col-span-4">
                  {p.tags.slice(0, 2).join(" / ")} · {p.agents[0]}
                </span>
                <span className="font-mono text-xs text-[var(--vp-muted)] md:col-span-2 md:text-right">
                  Added {p.added ?? "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
