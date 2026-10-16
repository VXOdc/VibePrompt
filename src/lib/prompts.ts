import fs from "fs/promises";
import path from "path";
import { parsePromptFile } from "./prompt-parser";
import type { PromptRecord } from "./types";

const PROMPTS_DIR = path.join(process.cwd(), "prompts");

export async function getAllPrompts(): Promise<PromptRecord[]> {
  const files = await collectMarkdownFiles(PROMPTS_DIR);
  const records = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const { meta, body } = parsePromptFile(raw);
      const slug = path
        .relative(PROMPTS_DIR, filePath)
        .replace(/\.md$/, "")
        .split(path.sep)
        .join("/");

      return { ...meta, slug, body, filePath };
    }),
  );

  return records.sort((a, b) => {
    const da = a.added ?? "";
    const db = b.added ?? "";
    return db.localeCompare(da) || a.title.localeCompare(b.title);
  });
}

export async function getPromptBySlug(slug: string): Promise<PromptRecord | null> {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  const filePath = path.join(PROMPTS_DIR, `${normalized}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { meta, body } = parsePromptFile(raw);
    return { ...meta, slug: normalized, body, filePath };
  } catch {
    return null;
  }
}

export async function searchPrompts(query: string, filters?: {
  category?: string;
  agent?: string;
  tag?: string;
}): Promise<PromptRecord[]> {
  const q = query.trim().toLowerCase();
  let items = await getAllPrompts();

  if (filters?.category) {
    const c = filters.category.toLowerCase();
    items = items.filter((p) => p.category.toLowerCase() === c);
  }
  if (filters?.agent) {
    const a = filters.agent.toLowerCase();
    items = items.filter((p) => p.agents.some((x) => x.toLowerCase().includes(a)));
  }
  if (filters?.tag) {
    const t = filters.tag.toLowerCase();
    items = items.filter((p) => p.tags.some((x) => x.toLowerCase() === t));
  }

  if (!q) return items;

  return items.filter((p) => {
    const haystack = [
      p.title,
      p.description,
      p.category,
      p.body,
      ...p.tags,
      ...(p.technologies ?? []),
      ...p.agents,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getCategories(prompts: PromptRecord[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of prompts) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelatedPrompts(all: PromptRecord[], current: PromptRecord, limit = 4): PromptRecord[] {
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      prompt: p,
      score:
        (p.category === current.category ? 3 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.prompt);
}

async function collectMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }

  return files;
}
