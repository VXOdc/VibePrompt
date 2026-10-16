# VibePrompt

Prompt library and creative workspace for turning ideas into ready-to-use instructions for AI tools.

**Find a prompt or start with an idea → shape it with Gemini → copy and create.**

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prompts as Markdown + YAML frontmatter in `/prompts`
- Gemini 3.8 Flash through Google's Interactions API (server route `/api/improve`)
- No database in V1

## Local setup

```bash
npm install
cp .env.example .env.local
# Add your Gemini API key
npm run dev
```

## Environment variables

| Variable | Description |
| -------- | ----------- |
| `GEMINI_API_KEY` | Gemini API key (server only) |

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
3. Set `GEMINI_API_KEY` in project environment variables
4. Deploy

## Design

The library includes 24 prompts for website design, civic information, portfolios, games, interactive fiction, creative coding, education, community events, and everyday tools. Website prompts include practical checks for visual hierarchy, responsive behavior, accessibility, functional states, and useful content.

## Product philosophy

Maximum useful specificity with minimum unnecessary complexity.
