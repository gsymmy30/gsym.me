import { z } from "zod";

/* ========= Characters ========= */
export const veepCharacterEnum = z.enum([
  "Selina Meyer",
  "Amy Brookheimer",
  "Dan Egan",
  "Jonah Ryan",
  "Gary Walsh",
  "Mike McLintock",
  "Ben Cafferty",
  "Kent Davison",
  "Catherine Meyer",
]);

/* ========= Response (model output) ========= */
export const veepResultSchema = z.object({
  top_match: veepCharacterEnum,
  scores: z
    .array(
      z.object({
        character: veepCharacterEnum,
        score: z.number().min(0).max(100),
      })
    )
    .length(9),
  why_you: z.string().min(1),
  quote: z.string().min(1),
  roast: z.string().min(1),
});

/* ========= Request (client → API) ========= */
export const quizAnswerSchema = z.object({
  qid: z.string(),
  choiceId: z.string().optional(),  // for multiple-choice questions
  freeText: z.string().optional(),  // for the open-text question
});

export const quizRequestSchema = z.object({
  answers: z.array(quizAnswerSchema).min(1),
});

/* ========= OpenAI JSON Schema (for response_format: json_schema) ========= */
export const veepResultJSONSchema = {
  name: "veep_result",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      top_match: { enum: veepCharacterEnum.options, type: "string" },
      scores: {
        type: "array",
        minItems: 9,
        maxItems: 9,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            character: { enum: veepCharacterEnum.options, type: "string" },
            score: { type: "number", minimum: 0, maximum: 100 },
          },
          required: ["character", "score"],
        },
      },
      why_you: { type: "string", minLength: 1 },
      quote: { type: "string", minLength: 1 },
      roast: { type: "string", minLength: 1 },
    },
    required: ["top_match", "scores", "why_you", "quote", "roast"],
  },
  strict: true,
} as const;
