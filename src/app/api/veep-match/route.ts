// src/app/api/veep-match/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/veep/prompt";
import { veepResultSchema, veepResultJSONSchema } from "@/lib/veep/schema";
import type { VeepResult } from "@/lib/veep/types";
import { quizRequestSchema } from "@/lib/veep/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Pull a JSON object even if the model wraps it in prose or fences. */
function extractJSON(s: string): unknown {
  const fenced = s.match(/```json([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : s;
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first >= 0 && last > first) {
    try {
      return JSON.parse(raw.slice(first, last + 1));
    } catch {
      /* fall through */
    }
  }
  return JSON.parse(s);
}

/** Try to fix common shape issues, then validate with Zod. */
function coerceVeepResult(raw: unknown): VeepResult | null {
  const direct = veepResultSchema.safeParse(raw);
  if (direct.success) return direct.data;

  try {
    const obj = typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
    if (!obj || typeof obj !== "object") return null;

    const canonical = [
      "Selina Meyer",
      "Amy Brookheimer",
      "Dan Egan",
      "Jonah Ryan",
      "Gary Walsh",
      "Mike McLintock",
      "Ben Cafferty",
      "Kent Davison",
      "Catherine Meyer",
    ] as const;

    // Normalize scores to an array of { character, score }
    let scores: Array<{ character: string; score: number }> = [];
    const maybeScores = (obj as Record<string, unknown>)["scores"];

    if (Array.isArray(maybeScores)) {
      scores = maybeScores.map((s) => ({
        character: String((s as Record<string, unknown>).character ?? ""),
        score: Number((s as Record<string, unknown>).score ?? 0),
      }));
    } else if (maybeScores && typeof maybeScores === "object") {
      scores = Object.entries(maybeScores as Record<string, unknown>).map(
        ([character, score]) => ({ character, score: Number(score) })
      );
    }

    const byChar = new Map<string, number>(
      scores.map((s) => [
        s.character,
        Math.max(0, Math.min(100, Number.isFinite(s.score) ? s.score : 0)),
      ])
    );

    const fixedScores = canonical.map((c) => ({
      character: c,
      score: byChar.get(c) ?? 0,
    }));

    const sorted = [...fixedScores].sort((a, b) => b.score - a.score);
    const candidateTop =
      (obj as Record<string, unknown>)["top_match"] ?? sorted[0]?.character;

    const fixed = {
      top_match: canonical.includes(candidateTop as (typeof canonical)[number])
        ? (candidateTop as VeepResult["top_match"])
        : (sorted[0]?.character as VeepResult["top_match"]),
      scores: fixedScores,
      why_you:
        String((obj as Record<string, unknown>)["why_you"] ?? "").slice(0, 300) ||
        "You blend tactics and tone like a Veep veteran.",
      quote:
        String((obj as Record<string, unknown>)["quote"] ?? "").slice(0, 200) ||
        "We’re all gonna die—but later.",
      roast:
        String((obj as Record<string, unknown>)["roast"] ?? "").slice(0, 240) ||
        "You call it narrative management; your team calls it cardio.",
    };

    const final = veepResultSchema.parse(fixed);
    return final;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const bodyUnknown: unknown = await req.json();
    const parsed = quizRequestSchema.safeParse(bodyUnknown);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = buildPrompt(parsed.data.answers);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 800,
      response_format: {
        type: "json_schema",
        json_schema: veepResultJSONSchema,
      },
      messages: [
        {
          role: "system",
          content:
            "You are a Veep-flavored personality classifier. Output must match the JSON schema exactly. No markdown, no explanations, no extra fields.",
        },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let jsonUnknown: unknown;
    try {
      jsonUnknown = extractJSON(raw);
    } catch {
      jsonUnknown = raw;
    }

    const result = coerceVeepResult(jsonUnknown);
    if (!result) {
      console.error("Model JSON failed validation. Raw:", raw);
      return NextResponse.json({ error: "Bad model JSON" }, { status: 502 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("veep-match error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
