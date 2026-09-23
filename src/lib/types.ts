export type ImprovementMode = "quick" | "developer" | "codex";

export type PromptMeta = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  agents: string[];
  technologies?: string[];
  added?: string;
};

export type PromptRecord = PromptMeta & {
  slug: string;
  body: string;
  filePath: string;
};

export type ProjectContext = {
  framework?: string;
  language?: string;
  styling?: string;
  deployment?: string;
  database?: string;
  authentication?: string;
  additional?: string;
};

export type ImproveRequest = {
  prompt: string;
  mode: ImprovementMode;
  projectContext?: ProjectContext;
  userInstructions?: string;
};

export type ImproveResponse = {
  improved: string;
  changes: string[];
  missing: string[];
  suggestions: string[];
};
