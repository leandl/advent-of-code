import { parseInputPuzzle, Reveal } from "./utils";

const LIMITS: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

function isGamePossible(reveals: Reveal[]): boolean {
  for (const reveal of reveals) {
    for (const [count, color] of reveal) {
      if (count > LIMITS[color]) {
        return false;
      }
    }
  }

  return true;
}

export function part1Run(lines: string[]) {
  const games = parseInputPuzzle(lines);

  let sum = 0;
  for (const [gameId, reveals] of games) {
    if (isGamePossible(reveals)) {
      sum += gameId;
    }
  }

  return sum;
}
