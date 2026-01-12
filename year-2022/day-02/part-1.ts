import { outcomeScore, parseInputPuzzle, shapeScore } from "./utils";

export function part1Run(lines: string[]) {
  const rounds = parseInputPuzzle(lines);

  return rounds.reduce((total, [opponent, player]) => {
    const roundScore = shapeScore[player] + outcomeScore(player, opponent);

    return total + roundScore;
  }, 0);
}
