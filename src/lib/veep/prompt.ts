import { CHARACTERS } from "./bible";
import { QUESTIONS } from "./questions";
import { QuizAnswer } from "./types";

export function buildPrompt(answers: QuizAnswer[]) {
  const bible = Object.entries(CHARACTERS).map(([name, def]) => ({
    name, traits: def.traits, quote: def.quote
  }));

  return [
    "You are a Veep-flavored personality classifier.",
    "Use ONLY the provided CHARACTER_BIBLE.",
    "Return VALID JSON ONLY matching schema:",
    `{
      "top_match": "<one of the characters>",
      "scores": [{"character": "<character>", "score": 0-100}, ... 9 total],
      "why_you": "<1-2 witty lines>",
      "quote": "<their signature quote>",
      "roast": "<PG-13 roast>"
    }`,
    "",
    "Scoring rubric:",
    "- Each chosen option adds base points to its hinted characters: primary +18, secondary +10, tertiary +6.",
    "- Free-text may add +0..20 based on lexical/tone alignment with traits.",
    "- Normalize each character to 0..100; preserve variance (not all ~50).",
    "- Tie-break: free-text alignment > number of choice hits > secondary traits.",
    "- If free-text is empty, do not invent.",
    "- If not in CHARACTER_BIBLE, score 0.",
    "",
    "Tone: witty but PG-13. No slurs.",
    "",
    `CHARACTER_BIBLE: ${JSON.stringify(bible, null, 2)}`,
    `QUESTIONS: ${JSON.stringify(QUESTIONS, null, 2)}`,
    `USER_ANSWERS: ${JSON.stringify(answers, null, 2)}`
  ].join("\n");
}
