import { VeepCharacter } from "./types";

export type Option = {
  id: string;
  label: string;
  hints: VeepCharacter[]; // characters this option should boost
};

export type Question =
  | { id: string; kind: "mc"; text: string; options: Option[] }
  | { id: string; kind: "free"; text: string; placeholder?: string; maxLen?: number };

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    kind: "mc",
    text: "A memo leaks and it’s ugly. What’s your first move?",
    options: [
      { id: "q1a", label: "Deny, reframe as a 'draft', smile through it.", hints: ["Selina Meyer","Mike McLintock"] },
      { id: "q1b", label: "Spin up a tracker, fix the process, ship a postmortem.", hints: ["Amy Brookheimer","Ben Cafferty"] },
      { id: "q1c", label: "Leak something shinier to bury it.", hints: ["Dan Egan"] },
      { id: "q1d", label: "Say 'wasn’t me, nerds!' louder.", hints: ["Jonah Ryan"] },
    ],
  },
  {
    id: "q2",
    kind: "mc",
    text: "Your name was mangled on TV.",
    options: [
      { id: "q2a", label: "Call producer; book a glow-up segment.", hints: ["Selina Meyer"] },
      { id: "q2b", label: "Send a style guide and pronunciation card.", hints: ["Amy Brookheimer"] },
      { id: "q2c", label: "Make a viral 'correction' post.", hints: ["Dan Egan","Mike McLintock"] },
      { id: "q2d", label: "Rename them 'Clown' in your phone.", hints: ["Jonah Ryan"] },
    ],
  },
  {
    id: "q3",
    kind: "mc",
    text: "Your happy place?",
    options: [
      { id: "q3a", label: "War room whiteboard.", hints: ["Ben Cafferty"] },
      { id: "q3b", label: "A pristine spreadsheet.", hints: ["Kent Davison"] },
      { id: "q3c", label: "The press scrum.", hints: ["Mike McLintock","Dan Egan"] },
      { id: "q3d", label: "The boss’s bag, prepared for everything.", hints: ["Gary Walsh"] },
    ],
  },
  {
    id: "q4",
    kind: "mc",
    text: "Your leadership superpower?",
    options: [
      { id: "q4a", label: "Optics and presence.", hints: ["Selina Meyer"] },
      { id: "q4b", label: "Ops and follow-through.", hints: ["Amy Brookheimer"] },
      { id: "q4c", label: "Narrative engineering.", hints: ["Dan Egan","Mike McLintock"] },
      { id: "q4d", label: "Numbers that slap.", hints: ["Kent Davison"] },
    ],
  },
  {
    id: "q5",
    kind: "mc",
    text: "You get blindsided in a meeting.",
    options: [
      { id: "q5a", label: "Smile, redirect, promise a 'bigger reveal'.", hints: ["Selina Meyer","Dan Egan"] },
      { id: "q5b", label: "Document action items and deadlines live.", hints: ["Amy Brookheimer"] },
      { id: "q5c", label: "Crack a morbid one-liner, move on.", hints: ["Ben Cafferty"] },
      { id: "q5d", label: "Say something confidently wrong.", hints: ["Jonah Ryan"] },
    ],
  },
  {
    id: "q6",
    kind: "mc",
    text: "Pick your sidekick:",
    options: [
      { id: "q6a", label: "A bag with everything (and a guy named Gary).", hints: ["Gary Walsh","Selina Meyer"] },
      { id: "q6b", label: "A perfectly labeled Airtable.", hints: ["Amy Brookheimer","Kent Davison"] },
      { id: "q6c", label: "A friendly press contact.", hints: ["Mike McLintock","Dan Egan"] },
      { id: "q6d", label: "A bullhorn.", hints: ["Jonah Ryan"] },
    ],
  }
];
