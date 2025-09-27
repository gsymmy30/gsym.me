import type { VeepCharacter } from "./types";

export const characterSlug: Record<VeepCharacter, string> = {
  "Selina Meyer": "selina-meyer",
  "Amy Brookheimer": "amy-brookheimer",
  "Dan Egan": "dan-egan",
  "Jonah Ryan": "jonah-ryan",
  "Gary Walsh": "gary-walsh",
  "Mike McLintock": "mike-mclintock",
  "Ben Cafferty": "ben-cafferty",
  "Kent Davison": "kent-davison",
  "Catherine Meyer": "catherine-meyer",
};

export function imagePathFor(c: VeepCharacter) {
  return `/veep/${characterSlug[c]}.png`;
}

export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[1]?.[0] ?? "";
  return (first + last).toUpperCase();
}
