---
title: Perform a Security Code Review
description: Review a change set for common web vulnerabilities and unsafe patterns.
category: Cybersecurity
tags:
  - security
  - review
difficulty: advanced
agents:
  - Codex
  - General
added: "09.15.26"
---

# Objective

Perform a security-focused review of the provided diff or files.

# Requirements

- Check authn/authz, injection, XSS, CSRF, secrets handling, and dependency risk
- Rate findings by severity
- Suggest concrete remediations

# Acceptance Criteria

- [ ] Findings reference file/line when possible
- [ ] False positives called out explicitly
