---
title: Design a Constituent Services Directory
description: Organize public service information so people can find the right office, contact path, and next step.
category: Civic Tech
tags: [constituent services, directory, accessibility, public service]
difficulty: advanced
agents: [Codex, Cursor, General]
technologies: [Next.js, TypeScript]
added: "10.16.26"
---

# Objective

Build an accessible directory that helps residents find relevant public services by topic and understand where to go next. The directory covers [jurisdiction or service area] and the verified services in [source data].

# Information architecture

- Group verified services under plain-language topics.
- Give each service a page with eligibility information, required documents when verified, location, hours, phone, official website, and last-reviewed date.
- Support search and useful filters without hiding the full directory.
- Clearly distinguish local, state, and federal services.
- Provide a correction or feedback contact that does not request sensitive case details.

# Safety and trust

Present the site as an informational directory, not an official determination or legal, immigration, medical, or financial adviser. Do not collect case records or sensitive identifiers. Do not invent service details, eligibility rules, or government affiliations. Keep source links visible and label external destinations.

# Acceptance criteria

- A visitor can identify the relevant office and official next step.
- Every service detail has a source and review date in the data model.
- Search, filters, and navigation are accessible and work on phones.
