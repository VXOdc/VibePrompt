---
title: Build a Personal Reading Map
description: Help readers keep track of books, follow curiosity between topics, and choose what to read next.
category: Productivity
tags: [reading, books, organization, personal]
difficulty: intermediate
agents: [Codex, Cursor, General]
technologies: [React, TypeScript]
added: "10.16.26"
---

# Objective

Create a private reading tracker that makes it pleasant to record books and notice connections between them.

# Core experience

- Record a book with title, author, status, rating, notes, and optional topics.
- Browse a shelf by status and search by title, author, or topic.
- Show a simple reading map that connects books sharing topics, with a list alternative.
- Offer one thoughtful next-read suggestion from the reader's own saved list.
- Store data locally by default and provide a clear export option.

# Design direction

Make the library feel like a personal collection rather than a productivity dashboard. Use book-cover images only when available and preserve a readable list view. Keep actions easy to undo and avoid competitive streaks or public sharing by default.

# Acceptance criteria

- Books can be created, edited, searched, filtered, and removed.
- The map and shelf reflect the same saved data.
- Data stays on the device unless the reader explicitly chooses an export or sync action.
