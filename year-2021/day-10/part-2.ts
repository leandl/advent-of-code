import { autocompleteScoreTable, openToClose } from "./utils";

export function part2Run(lines: string[]) {
  const scores: number[] = [];

  for (const line of lines) {
    const stack: string[] = [];
    let corrupted = false;

    for (const char of line) {
      if (char in openToClose) {
        stack.push(char);
      } else {
        const lastOpen = stack.pop();

        if (!lastOpen || openToClose[lastOpen] !== char) {
          corrupted = true;
          break;
        }
      }
    }

    if (corrupted) continue;

    if (stack.length === 0) continue;

    let score = 0;

    while (stack.length > 0) {
      const open = stack.pop()!;
      const close = openToClose[open];

      score = score * 5 + autocompleteScoreTable[close];
    }

    scores.push(score);
  }

  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
}
