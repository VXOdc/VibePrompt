import matter from "gray-matter";
import type { PromptMeta } from "./types";

export function parsePromptFile(raw: string): { meta: PromptMeta; body: string } {
  const { data, content } = matter(raw);

  const tags = normalizeList(data.tags);
  const agents = normalizeList(data.agents ?? data.tool ?? data.tools);

  const meta: PromptMeta = {
    title: String(data.title ?? "Untitled prompt"),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    tags,
    difficulty: (data.difficulty as PromptMeta["difficulty"]) ?? "intermediate",
    agents: agents.length ? agents : ["General"],
    technologies: normalizeList(data.technologies),
    added: data.added ? String(data.added) : undefined,
  };

  return { meta, body: content.trim() };
}

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}
