import { NextResponse } from "next/server";
import { improvePrompt } from "@/lib/mistral";
import type { ImproveRequest, ImprovementMode } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ImproveRequest>;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const mode = (body.mode ?? "developer") as ImprovementMode;
    if (!["quick", "developer", "codex"].includes(mode)) {
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
