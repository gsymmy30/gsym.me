export type VeepCharacter =
  | "Selina Meyer"
  | "Amy Brookheimer"
  | "Dan Egan"
  | "Jonah Ryan"
  | "Gary Walsh"
  | "Mike McLintock"
  | "Ben Cafferty"
  | "Kent Davison"
  | "Catherine Meyer";

export interface CharacterDef {
  traits: string[];
  quote: string;
}

export interface VeepResult {
  top_match: VeepCharacter;
  scores: { character: VeepCharacter; score: number }[];
  why_you: string;
  quote: string;
  roast: string;
}

export type QuizAnswer = {
  qid: string;
  choiceId?: string;   // for multiple-choice
  freeText?: string;   // for the open-text question
};

export interface QuizRequestBody {
  answers: QuizAnswer[];
}
