import { parseCards, Scratchcard } from "./utils";

function countMatches(card: Scratchcard): number {
  let matches = 0;

  for (const num of card.haveNumbers) {
    if (card.winningNumbers.has(num)) {
      matches++;
    }
  }

  return matches;
}

export function part2Run(lines: string[]) {
  const cards = parseCards(lines);
  const counts = new Array(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    const matches = countMatches(cards[i]);

    for (let j = 1; j <= matches; j++) {
      if (i + j < cards.length) {
        counts[i + j] += counts[i];
      }
    }
  }

  return counts.reduce((sum, count) => sum + count, 0);
}
