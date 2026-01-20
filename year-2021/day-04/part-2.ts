import {
  createMarked,
  hasWon,
  markNumber,
  parseBingoInput,
  sumUnmarked,
} from "./utils";

export function part2Run(lines: string[]) {
  const { draws, boards } = parseBingoInput(lines);

  const markedBoards = boards.map(() => createMarked());
  const hasAlreadyWon = new Set<number>();

  let lastScore = 0;

  for (const draw of draws) {
    for (let b = 0; b < boards.length; b++) {
      // Ignora boards que já venceram
      if (hasAlreadyWon.has(b)) continue;

      markNumber(boards[b], markedBoards[b], draw);

      if (hasWon(markedBoards[b])) {
        hasAlreadyWon.add(b);

        lastScore = sumUnmarked(boards[b], markedBoards[b]) * draw;
      }
    }
  }

  return lastScore;
}
