import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/veep/prompt";
import { quizRequestSchema, veepResultSchema } from "@/lib/veep/schema";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "nodejs"; // ensure Node runtime on Vercel
export const dynamic = "force-dynamic"; // avoid static caching

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = quizRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.format() }, { status: 400 });
    }

    const prompt = buildPrompt(parsed.data.answers);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      top_p: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a Veep-flavored personality classifier. Return VALID JSON ONLY." },
        { role: "user", content: prompt }
      ]
    });

    const content = completion.choices[0]?.message?.content ?? "{}";
    const json = JSON.parse(content);

    const validated = veepResultSchema.safeParse(json);
    if (!validated.success) {
      return NextResponse.json({ error: "Bad model JSON", details: validated.error.format() }, { status: 502 });
    }

    return NextResponse.json(validated.data, { status: 200 });
  } catch (err: any) {
    console.error("veep-match error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
