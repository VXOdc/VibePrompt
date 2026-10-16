import { NextResponse } from "next/server";
import { improvePrompt } from "@/lib/gemini";
import type { ImproveRequest, ImprovementMode } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ImproveRequest>;
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (prompt.length > 12_000) {
      return NextResponse.json({ error: "Keep your prompt under 12,000 characters." }, { status: 400 });
    }
    if (typeof body.userInstructions === "string" && body.userInstructions.length > 4_000) {
      return NextResponse.json({ error: "Creative direction is too long." }, { status: 400 });
    }

    const mode = (body.mode ?? "developer") as ImprovementMode;
    if (!["quick", "developer", "codex", "creative"].includes(mode)) {
      return NextResponse.json({ error: "Invalid improvement mode" }, { status: 400 });
    }

    const result = await improvePrompt({
      prompt,
      mode,
      projectContext: body.projectContext,
      userInstructions: body.userInstructions,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Improvement failed";
    const status = message.includes("GEMINI_API_KEY") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
