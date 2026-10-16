---
title: Debug a TypeScript Error
description: Systematically isolate and fix a TypeScript error without changing runtime behavior unintentionally.
category: Debugging
tags:
  - typescript
  - debugging
difficulty: intermediate
agents:
  - Codex
added: "09.21.26"
---

# Objective

Fix the reported TypeScript error while preserving intended runtime behavior.

# Requirements

- Reproduce the error with the smallest example possible
- Explain root cause before applying the fix
- Prefer type-safe fixes over `any`

# Acceptance Criteria

- [ ] `tsc` / build passes
- [ ] No suppressed errors without justification
