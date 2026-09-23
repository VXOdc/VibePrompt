"use client";

type PromptEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  label?: string;
  dark?: boolean;
  className?: string;
};

export function PromptEditor({
  value,
  onChange,
  readOnly = false,
  label,
  dark = true,
  className = "",
}: PromptEditorProps) {
  return (
    <div
      className={`border border-[var(--vp-border-strong)] ${
        dark ? "bg-[var(--vp-ink)] text-[var(--vp-off-white)]" : "bg-[var(--vp-surface)] text-[var(--vp-ink)]"
      } ${className}`}
    >
      {label && (
        <div className="border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--vp-beige)]">
          {label}
        </div>
      )}
      <textarea
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        spellCheck={false}
        className="min-h-[280px] w-full resize-y bg-transparent px-4 py-4 font-mono text-sm leading-relaxed outline-none md:min-h-[360px]"
      />
    </div>
  );
}
