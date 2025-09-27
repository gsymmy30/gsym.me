import { z } from "zod";
import { VeepCharacter } from "./types";

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

export const veepResultSchema = z.object({
  top_match: veepCharacterEnum,
  scores: z.array(z.object({
    character: veepCharacterEnum,
    score: z.number().min(0).max(100)
  })).length(9),
  why_you: z.string().min(1),
  quote: z.string().min(1),
  roast: z.string().min(1),
});

export const quizAnswerSchema = z.object({
  qid: z.string(),
  choiceId: z.string().optional(),
  freeText: z.string().max(400).optional()
});

export const quizRequestSchema = z.object({
  answers: z.array(quizAnswerSchema).min(5)
});

export type VeepResultSchema = z.infer<typeof veepResultSchema>;
