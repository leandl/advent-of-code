import { isValidUpdate, parseInputPuzzle } from "./utils";

export function part1Run(lines: string[]): number {
  const { rules, updates } = parseInputPuzzle(lines);

  let sumOfMiddles = 0;

  for (const update of updates) {
    if (isValidUpdate(update, rules)) {
      const middleIndex = Math.floor(update.length / 2);
      sumOfMiddles += update[middleIndex];
    }
  }

  return sumOfMiddles;
}
