# VibePrompt

> A curated library and interactive workspace for structured AI prompts, designed to help developers, creators, and builders get the most out of large language models.

---

## Overview

**VibePrompt** is a fully-working, web-based platform built as a central hub for high-quality, reusable prompt engineering templates. Whether you are building games, writing backend code, designing user interfaces, or generating creative content, VibePrompt provides a seamless web interface to test, refine, and improve your prompts instantly online.

---

## Key Features

* **Curated Prompt Library:** Explore categorized prompt templates covering backend development, civic tech, cybersecurity, creative coding, education, gaming, and more.
* **Interactive Web Workspace:** Test and edit prompts directly in your browser without needing any local setup.
* **AI Improver Integration:** Powered by advanced AI capabilities to enhance, expand, and optimize your prompts on the fly.
* **Responsive Modern UI:** Crafted with Next.js, React, and Tailwind CSS for a sleek, fast, and modern user experience.

---

## Built With

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Language:** TypeScript
* **AI Integration:** Google Gemini API

---

## Web-Only Deployment & Usage

VibePrompt is architected as a web-first application designed for seamless online access. 

* **Live Web Application:** Accessible directly via cloud hosting providers (e.g., Vercel).
* **No Local Installation Required:** Users can access the platform instantly through any modern web browser without configuring a local development environment.
* **Environment Configuration:** For production deployments, ensure the required environment variables (such as `GEMINI_API_KEY`) are properly configured in your hosting provider's dashboard settings.

---

## Project Architecture

```text
VibePrompt-main/
├── prompts/              # Markdown files containing curated prompt templates
├── public/               # Static assets, icons, and branding
├── src/
│   ├── app/              # Next.js App Router pages and API route handlers
│   ├── components/       # Reusable UI components (Workspace, Editors, Navbar, AI Improver)
│   └── lib/              # Utility functions, prompt parsers, and API clients
├── package.json          # Project dependencies and deployment scripts
└── tsconfig.json         # TypeScript configuration
