import {
  chooseMove,
  outcomeScore,
  parseInputPuzzlePart2,
  shapeScore,
} from "./utils";

export function part2Run(lines: string[]) {
  const rounds = parseInputPuzzlePart2(lines);

  return rounds.reduce((total, [opponent, desiredOutcome]) => {
    const playerMove = chooseMove(opponent, desiredOutcome);

    const roundScore =
      shapeScore[playerMove] + outcomeScore(playerMove, opponent);

    return total + roundScore;
  }, 0);
}
