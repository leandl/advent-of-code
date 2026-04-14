class DeterministicDie {
  private die: number;
  private rolls: number;

  constructor() {
    this.die = 1;
    this.rolls = 0;
  }

  roll(): number {
    const value = this.die;
    this.die = (this.die % 100) + 1;
    this.rolls++;
    return value;
  }

  getRolls(): number {
    return this.rolls;
  }
}

function move(pos: number, steps: number): number {
  return ((pos - 1 + steps) % 10) + 1;
}

export function part1Run(player1Start: number, player2Start: number) {
  let player1Pos = player1Start;
  let player2Pos = player2Start;

  let player1Score = 0;
  let player2Score = 0;

  const die = new DeterministicDie();

  while (true) {
    // Player 1 turn
    let moveSum = die.roll() + die.roll() + die.roll();
    player1Pos = move(player1Pos, moveSum);
    player1Score += player1Pos;

    if (player1Score >= 1000) {
      return player2Score * die.getRolls();
    }

    // Player 2 turn
    moveSum = die.roll() + die.roll() + die.roll();
    player2Pos = move(player2Pos, moveSum);
    player2Score += player2Pos;

    if (player2Score >= 1000) {
      return player1Score * die.getRolls();
    }
  }
}
