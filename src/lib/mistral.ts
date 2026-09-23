import type { ImproveRequest, ImproveResponse } from "./types";

const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";

const MODE_INSTRUCTIONS: Record<ImproveRequest["mode"], string> = {
  quick:
    "Make small improvements while preserving original wording and intent. Fix unclear wording and add only essential missing technical details.",
  developer:
    "Improve technical clarity: requirements, constraints, implementation details, edge cases, and acceptance criteria. Preserve explicit user constraints.",
  codex:
    "Rewrite for AI coding agents using relevant sections such as Objective, Context, Requirements, Technical Constraints, Implementation Plan, Files to Modify, Files to Create, Edge Cases, Testing Requirements, Acceptance Criteria. Omit irrelevant sections. Prioritize useful specificity over length.",
};

export async function improvePrompt(input: ImproveRequest): Promise<ImproveResponse> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return mockImprove(input);
  }

  const system = `You are VibePrompt's prompt-engineering agent for AI coding tools.

Rules:
1. Preserve the user's original intent and explicit constraints.
2. Never invent requirements unless labeled as suggestions in "missing" or "suggestions".
3. Identify ambiguity and missing technical information.
4. Improve structure and actionability for coding agents.
5. Do not make prompts longer unless each addition is useful.
6. Distinguish user requirements from AI suggestions.

Respond with valid JSON only:
{
  "improved": "full improved prompt text",
  "changes": ["bullet list of important changes"],
  "missing": ["missing information the user should consider"],
  "suggestions": ["optional recommendations clearly marked as suggestions"]
}`;

  const userPayload = {
    mode: input.mode,
    modeInstruction: MODE_INSTRUCTIONS[input.mode],
    originalPrompt: input.prompt,
    projectContext: input.projectContext ?? null,
    userInstructions: input.userInstructions ?? null,
  };

  const res = await fetch(MISTRAL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL ?? "mistral-small-latest",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(userPayload) },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mistral API error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from Mistral");

  const parsed = JSON.parse(content) as ImproveResponse;
  return {
    improved: String(parsed.improved ?? input.prompt),
    changes: Array.isArray(parsed.changes) ? parsed.changes.map(String) : [],
    missing: Array.isArray(parsed.missing) ? parsed.missing.map(String) : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.map(String) : [],
  };
}

function mockImprove(input: ImproveRequest): ImproveResponse {
  const header =
    input.mode === "codex"
      ? "# Objective\n\n"
      : input.mode === "developer"
        ? "## Task\n\n"
        : "";

  const improved = `${header}${input.prompt.trim()}\n\n## Notes (demo — set MISTRAL_API_KEY)\n- Clarify acceptance criteria\n- Specify stack and deployment target\n- List files or modules in scope`;

  return {
    improved,
    changes: [
      "Structured the prompt for a coding agent",
      "Added placeholders for constraints and verification",
    ],
    missing: [
      "Target framework and language",
      "Deployment environment",
      "Authentication requirements",
    ],
    suggestions: [
      "Add acceptance criteria as checkboxes",
      "Name existing files or modules if refactoring",
    ],
  };
}
