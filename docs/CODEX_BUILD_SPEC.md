# VibePrompt — product and design notes

This document summarizes product architecture, Gemini behavior, and the existing VibePrompt visual direction.

## Non-negotiables

- VibePrompt combines a prompt library with an AI-assisted creative workspace.
- Do **not** replace Codex — output copy-ready prompts for external coding agents.
- Do **not** give Gemini unrestricted access to arbitrary site content or user GitHub repos.
- Use a **controlled** `/api/improve` context interface and prompt files loaded server-side.
- No database or auth in V1 unless explicitly required.

## Design direction (references ≠ templates)

Use uploaded website screenshots and research files as **visual references for design language**, not templates to copy.

Extract principles:

- Large typography, wide sections, asymmetric layouts
- 12-column grid, thin dividers, minimal rounding
- Neutral base + one strong accent; alternate light/dark sections
- Monospace for prompts, tags, metadata, code
- Editorial hierarchy over card-heavy SaaS UI

**Avoid:** purple AI gradients, sparkle icons, emoji UI, floating rounded-card clutter, generic chat-first homepage.

### Color tokens (CSS variables — extend, do not flood every section)

| Token | Hex | Use |
| ----- | --- | --- |
| Off-white | `#F1EEE7` | Light sections |
| Ink | `#171717` | Dark sections, type |
| Coral | `#FF5548` | Primary accent |
| Muted blue | `#7087A5` | Technical sections |
| Navy | `#17203A` | Alternate dark blocks |
| Beige | `#CDBBA6` | Secondary backgrounds |

Rule: **neutral + black type + one accent** per view; occasional alternate sections only.

### Typography priority

**Typography → Layout → Color → Imagery → Motion**

Display headings may be extremely large on desktop. Body copy stays readable. Monospace for all developer-facing prompt surfaces.

### Homepage sections (composition)

1. Asymmetric hero — not centered
2. Featured prompt split (editorial + dark prompt panel)
3. Explore library — asymmetric editorial grid
4. AI improvement — coral pipeline (not chat UI)
5. Category modular grid
6. Codex workflow timeline
7. Workspace preview (tool-dark)
8. Editorial / technical imagery band
9. Dark statement section
10. Latest prompts list (clickable rows)
11. Large editorial footer

### Motion

Restrained hovers, section reveals, prompt transformation only. Site must work with motion disabled.

## Architecture

```text
Next.js + TypeScript + Tailwind → Vercel
Prompts: /prompts/**/*.md (gray-matter)
AI: POST /api/improve → Gemini (server-only key)
```

## Gemini prompt modes

- **quick** — small clarity fixes
- **developer** — requirements, constraints, acceptance
- **codex** — agent-structured sections (omit irrelevant blocks)
- **creative** — imaginative briefs for websites, apps, games, stories, and more

Return one complete, copy-ready prompt. Do not include change logs, recommendations, or setup instructions. Never silently overwrite the user's original.

## Security

- `GEMINI_API_KEY` server-side only
- No default GitHub repo access; optional pasted project context only

## V1 scope implemented in this repo

- Homepage editorial sections
- Prompt library, search, categories, detail pages
- Copy prompt
- Improve + workspace flows
- Seed prompt library under `/prompts`

## V2+ (design for, do not build yet)

GitHub OAuth, saved prompts, private collections, repo-aware context, semantic search, community submissions.

## Anti-patterns (from vibe-coded audit)

See user reference `Website improve (1).txt`: avoid signature purple, sparkle overload, fake testimonials, decorative social links, inverted icon/text hierarchy, and gimmicky motion.

---

When references conflict with this spec, **this spec wins**. When implementing UI, reinterpret reference **principles** for VibePrompt’s developer prompt product — never clone proprietary layouts or branding.
