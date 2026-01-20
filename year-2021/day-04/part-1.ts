import {
  createMarked,
  hasWon,
  markNumber,
  parseBingoInput,
  sumUnmarked,
} from "./utils";

export function part1Run(lines: string[]) {
  const { draws, boards } = parseBingoInput(lines);

  const markedBoards = boards.map(() => createMarked());

  for (const draw of draws) {
    for (let b = 0; b < boards.length; b++) {
      markNumber(boards[b], markedBoards[b], draw);

      if (hasWon(markedBoards[b])) {
        return sumUnmarked(boards[b], markedBoards[b]) * draw;
      }
    }
  }

  throw new Error("Nenhum board venceu");
}
