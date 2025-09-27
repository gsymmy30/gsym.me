import { VeepCharacter, CharacterDef } from "./types";

export const CHARACTERS: Record<VeepCharacter, CharacterDef> = {
  "Selina Meyer": {
    traits: ["ruthless ambition", "image-obsessed", "deflects blame with poise"],
    quote: "How is this my fault?"
  },
  "Amy Brookheimer": {
    traits: ["hyper-competent", "no-nonsense", "combusts under fools"],
    quote: "We don’t have time for your feelings."
  },
  "Dan Egan": {
    traits: ["opportunist", "optics > ethics", "PR-native"],
    quote: "If it polls, it’s policy."
  },
  "Jonah Ryan": {
    traits: ["delusional confidence", "chaos magnet", "bull-in-china-shop"],
    quote: "People love me. Fact."
  },
  "Gary Walsh": {
    traits: ["pathologically loyal", "anxious fixer", "knows the boss’s soul"],
    quote: "I packed your smile dress."
  },
  "Mike McLintock": {
    traits: ["affable", "always underwater", "spin-first"],
    quote: "We’ll circle back."
  },
  "Ben Cafferty": {
    traits: ["dark humor realist", "triage master", "endgame thinker"],
    quote: "We’re all gonna die—but later."
  },
  "Kent Davison": {
    traits: ["data absolutist", "zero small talk", "models > vibes"],
    quote: "The numbers are speaking."
  },
  "Catherine Meyer": {
    traits: ["empathetic", "conflict-avoidant", "documentary brain"],
    quote: "Let’s… not."
  }
};
