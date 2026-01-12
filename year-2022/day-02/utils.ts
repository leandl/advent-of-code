enum Move {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

const opponentMap: Record<string, Move> = {
  A: Move.ROCK,
  B: Move.PAPER,
  C: Move.SCISSORS,
};

const playerMap: Record<string, Move> = {
  X: Move.ROCK,
  Y: Move.PAPER,
  Z: Move.SCISSORS,
};

export const shapeScore: Record<Move, number> = {
  [Move.ROCK]: 1,
  [Move.PAPER]: 2,
  [Move.SCISSORS]: 3,
};

export function parseInputPuzzle(lines: string[]): Array<[Move, Move]> {
  return lines.map((line) => {
    const [opponentCode, playerCode] = line.split(" ");
    return [opponentMap[opponentCode], playerMap[playerCode]];
  });
}

export function outcomeScore(player: Move, opponent: Move): number {
  if (player === opponent) return 3; // draw

  if (
    (player === Move.ROCK && opponent === Move.SCISSORS) ||
    (player === Move.PAPER && opponent === Move.ROCK) ||
    (player === Move.SCISSORS && opponent === Move.PAPER)
  ) {
    return 6; // win
  }

  return 0; // loss
}

enum Outcome {
  LOSE = "LOSE",
  DRAW = "DRAW",
  WIN = "WIN",
}

const outcomeMap: Record<string, Outcome> = {
  X: Outcome.LOSE,
  Y: Outcome.DRAW,
  Z: Outcome.WIN,
};

export function parseInputPuzzlePart2(lines: string[]): Array<[Move, Outcome]> {
  return lines.map((line) => {
    const [opponentCode, outcomeCode] = line.split(" ");
    return [opponentMap[opponentCode], outcomeMap[outcomeCode]];
  });
}

export function chooseMove(opponent: Move, outcome: Outcome): Move {
  if (outcome === Outcome.DRAW) {
    return opponent;
  }

  if (outcome === Outcome.WIN) {
    switch (opponent) {
      case Move.ROCK:
        return Move.PAPER;
      case Move.PAPER:
        return Move.SCISSORS;
      case Move.SCISSORS:
        return Move.ROCK;
    }
  }

  // outcome === Outcome.LOSE
  switch (opponent) {
    case Move.ROCK:
      return Move.SCISSORS;
    case Move.PAPER:
      return Move.ROCK;
    case Move.SCISSORS:
      return Move.PAPER;
  }
}
