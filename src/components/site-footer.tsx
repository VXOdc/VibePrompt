import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--vp-ink)] text-[var(--vp-off-white)]">
      <div className="vp-container grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-[0.22em] text-[var(--vp-beige)]">VIBEPROMPT</p>
          <p className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Better instructions.
            <br />
            Better builds.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Prompts</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--vp-off-white)]/80">
              <li><Link href="/prompts" className="hover:text-[var(--vp-coral)]">Explore</Link></li>
              <li><Link href="/categories/frontend" className="hover:text-[var(--vp-coral)]">Categories</Link></li>
              <li><Link href="/prompts/codex/build-nextjs-dashboard" className="hover:text-[var(--vp-coral)]">Codex</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Tools</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--vp-off-white)]/80">
              <li><Link href="/improve" className="hover:text-[var(--vp-coral)]">Improve</Link></li>
              <li><Link href="/workspace" className="hover:text-[var(--vp-coral)]">Workspace</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">Project</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--vp-off-white)]/80">
              <li><a href="https://github.com" className="hover:text-[var(--vp-coral)]">GitHub</a></li>
              <li><Link href="#about" className="hover:text-[var(--vp-coral)]">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-12 md:flex md:items-end md:justify-between md:border-t md:border-white/10 md:pt-8">
          <p className="font-mono text-[10px] text-[var(--vp-off-white)]/50">© {new Date().getFullYear()} VibePrompt</p>
          <p className="mt-8 font-serif text-5xl font-medium tracking-tight text-[var(--vp-off-white)]/15 md:mt-0 md:text-7xl">
            VIBEPROMPT
          </p>
        </div>
      </div>
    </footer>
  );
}
