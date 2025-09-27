import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/veep/prompt";
import {
  veepResultSchema,
  veepResultJSONSchema,
} from "@/lib/veep/schema";
import type { VeepResult } from "@/lib/veep/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractJSON(s: string): unknown {
  // If the model ever wraps JSON in prose or fences, try to pull the first JSON object
  const fence = s.match(/```json([\s\S]*?)```/i);
  const raw = fence ? fence[1] : s;
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    try { return JSON.parse(raw.slice(firstBrace, lastBrace + 1)); } catch {}
  }
  // final attempt
  return JSON.parse(s);
}

function coerceVeepResult(raw: unknown): VeepResult | null {
  // Try zod first
  const parsed = veepResultSchema.safeParse(raw);
  if (parsed.success) return parsed.data;

  // Minimal fixer for common issues:
  try {
    const obj: any = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!obj || typeof obj !== "object") return null;

    // Ensure scores is an array of length 9 with the right characters
    const canonical = [
      "Selina Meyer","Amy Brookheimer","Dan Egan","Jonah Ryan",
      "Gary Walsh","Mike McLintock","Ben Cafferty","Kent Davison","Catherine Meyer",
    ] as const;

    let scores: Array<{ character: string; score: number }> = Array.isArray(obj.scores) ? obj.scores : [];

    // If it came as an object map, convert to array
    if (!Array.isArray(obj.scores) && obj.scores && typeof obj.scores === "object") {
      scores = Object.entries(obj.scores).map(([character, score]) => ({
        character, score: Number(score),
      }));
    }

    // Clamp & fill missing
    const byChar = new Map(scores.map((s) => [s.character, Math.max(0, Math.min(100, Number(s.score) || 0))]));
    const fixedScores = canonical.map((c) => ({
      character: c,
      score: byChar.get(c) ?? 0,
    }));

    const fixed = {
      top_match: canonical.includes(obj.top_match) ? obj.top_match : fixedScores.sort((a,b)=>b.score-a.score)[0].character,
      scores: fixedScores,
      why_you: String(obj.why_you ?? "").slice(0, 300) || "You blend tactics and tone like a Veep veteran.",
      quote: String(obj.quote ?? "").slice(0, 200) || "We’re all gonna die—but later.",
      roast: String(obj.roast ?? "").slice(0, 240) || "You call it narrative management; your team calls it cardio.",
    };

    const final = veepResultSchema.parse(fixed);
    return final;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = buildPrompt(body.answers);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 700, // give room
      response_format: {
        type: "json_schema",
        json_schema: veepResultJSONSchema,
      },
      messages: [
        { role: "system", content: "You are a Veep-flavored personality classifier. Output must match the JSON schema exactly. No markdown, no extra fields." },
        { role: "user", content: prompt }
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    // Extra safety: extract JSON if provider wraps or adds fences
    let jsonUnknown: unknown;
    try {
      jsonUnknown = extractJSON(raw);
    } catch {
      jsonUnknown = raw;
    }

    let result = coerceVeepResult(jsonUnknown);
    if (!result) {
      // Log to server console for debugging; do not expose raw content to user
      console.error("Model JSON failed validation. Raw:", raw);
      return NextResponse.json({ error: "Bad model JSON" }, { status: 502 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("veep-match error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
