import type { ImproveRequest, ImproveResponse } from "./types";

const MODE_INSTRUCTIONS: Record<ImproveRequest["mode"], string> = {
  quick:
    "Make a light edit that improves clarity and flow while preserving the original scope, detail, and intent.",
  developer:
    "Rewrite as a clear software task with concrete requirements, technical constraints, edge cases, and acceptance criteria suited to the request.",
  codex:
    "Write a complete, implementation-ready instruction for an AI coding agent. Include only relevant sections such as objective, requirements, design direction, technical constraints, accessibility, responsive behavior, and acceptance criteria.",
  creative:
    "Transform the idea into a specific, memorable, ready-to-use creative brief. Define its audience, central experience, content, and art direction while preserving the original purpose.",
};

const DESIGN_GUIDANCE = `For website and interface prompts, apply these principles where relevant:
- Use a consistent spacing rhythm, clear type hierarchy, and a restrained palette that fits the subject.
- Describe a deliberate layout, useful navigation, real content, and a clear value for the intended audience.
- Include responsive behavior, accessible contrast and keyboard interaction, functional controls, and loading, empty, and error states where needed.
- Keep motion purposeful. Avoid generic gradients, decorative clutter, emoji in place of icons, fake testimonials, and inconsistent components.
- Respect any style or color direction the user specifies.`;

const SYSTEM_INSTRUCTION = `You are VibePrompt, a prompt designer for websites, software, games, writing, and other creative projects.

Return only one complete, polished, copy-ready prompt. Do not include analysis, commentary, suggestions, a change log, questions, or setup instructions. Do not tell the reader to "add this", "change that", or revise the result later. Make reasonable, low-risk decisions when details are missing, without inventing consequential features or claiming assumptions came from the user. Preserve every explicit user constraint. Keep the prompt specific and useful without padding.

${DESIGN_GUIDANCE}

Adapt the requirements to the requested medium. Never force software or website requirements into a story, game, brand, or other non-software project.`;
const MODEL = "gemini-3.8-flash";

export async function improvePrompt(input: ImproveRequest): Promise<ImproveResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini is not configured. Set GEMINI_API_KEY in the server environment.");
  }

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      model: MODEL,
      system_instruction: SYSTEM_INSTRUCTION,
      input: JSON.stringify({
        mode: input.mode,
        direction: MODE_INSTRUCTIONS[input.mode],
        ideaOrPrompt: input.prompt,
        projectContext: input.projectContext ?? null,
        userInstructions: input.userInstructions ?? null,
      }),
      generation_config: { thinking_level: "medium" },
      store: false,
    }),
    signal: AbortSignal.timeout(90_000),
  });

  if (!response.ok) {
    const details = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    throw new Error(details?.error?.message ?? `Gemini request failed (${response.status}). Please try again.`);
  }

  const data = await response.json() as {
    status?: string;
    steps?: { type?: string; content?: { type?: string; text?: string }[] }[];
  };
  const improved = data.steps
    ?.filter((step) => step.type === "model_output")
    .flatMap((step) => step.content ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("\n")
    .trim();

  if (data.status && data.status !== "completed") {
    throw new Error(`Gemini could not complete this prompt (${data.status}). Please try again.`);
  }
  if (!improved) {
    throw new Error("Gemini returned an empty prompt. Please try again.");
  }

  return { improved };
}
