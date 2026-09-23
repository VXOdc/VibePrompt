# VibePrompt

Prompt library and prompt-engineering workspace for AI coding agents (Codex, Cursor, and others).

**Find a prompt → customize → improve with Mistral → copy → use with Codex.**

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prompts as Markdown + YAML frontmatter in `/prompts`
- Mistral API (server route `/api/improve`)
- No database in V1

## Local setup

```bash
npm install
cp .env.example .env.local
# Add MISTRAL_API_KEY for live improvements (demo fallback works without it)
npm run dev
```

## Environment variables

| Variable | Description |
| -------- | ----------- |
| `MISTRAL_API_KEY` | Mistral API key (server only) |
| `MISTRAL_MODEL` | Optional model id (default `mistral-small-latest`) |

## Adding prompts

Add a file under `prompts/`:

```text
prompts/codex/my-prompt.md
```

With frontmatter:

```yaml
---
title: My Prompt
description: One-line summary
category: Frontend
tags:
  - react
difficulty: intermediate
agents:
  - Codex
added: "09.23.26"
---
```

The app discovers prompts automatically at build/runtime.

## Deploy (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Set `MISTRAL_API_KEY` in project environment variables
4. Deploy

## Design

See `docs/CODEX_BUILD_SPEC.md` for product architecture, Mistral behavior rules, and editorial design direction (references are inspiration only — not clones).

## Product philosophy

Maximum useful specificity with minimum unnecessary complexity.
