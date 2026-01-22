import { parseCards } from "./utils";

export function part1Run(lines: string[]) {
  const cards = parseCards(lines);
  let total = 0;

  for (const card of cards) {
    let matches = 0;

    for (const num of card.haveNumbers) {
      if (card.winningNumbers.has(num)) {
        matches++;
      }
    }

    if (matches > 0) {
      total += 2 ** (matches - 1);
    }
  }

  return total;
}
