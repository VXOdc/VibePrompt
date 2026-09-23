---
title: Build a Production Next.js Dashboard
description: Scaffold a production-ready dashboard with typed data layers, layouts, and acceptance criteria.
category: Next.js
tags:
  - nextjs
  - dashboard
  - typescript
  - frontend
difficulty: intermediate
agents:
  - Codex
technologies:
  - Next.js
  - TypeScript
  - Tailwind CSS
added: "09.23.26"
---

# Objective

Build a production-ready admin dashboard using Next.js App Router, TypeScript, and Tailwind CSS.

# Context

Greenfield project. No authentication in v1 unless specified.

# Requirements

- App shell with sidebar navigation and responsive layout
- Dashboard home with KPI cards and a data table
- Reusable UI primitives (button, input, card) with consistent spacing
- Loading, empty, and error states for async views

# Technical Constraints

- Use server components where appropriate; client components only when needed
- No external UI kit unless requested
- Accessible focus states and semantic HTML

# Acceptance Criteria

- `npm run build` passes with no type errors
- Layout works on mobile and desktop
- Table supports sortable columns (client-side is fine for v1)
