type StateKey = string;

const rollFrequencies: [number, number][] = [
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1],
];

function move(pos: number, steps: number): number {
  return ((pos - 1 + steps) % 10) + 1;
}

export function part2Run(player1Start: number, player2Start: number) {
  const memo = new Map<StateKey, [number, number]>();

  function dfs(
    player1Pos: number,
    player2Pos: number,
    player1Score: number,
    player2Score: number,
    isPlayer1Turn: boolean,
  ): [number, number] {
    const key = `${player1Pos},${player2Pos},${player1Score},${player2Score},${isPlayer1Turn}`;

    if (memo.has(key)) return memo.get(key)!;

    if (player1Score >= 21) return [1, 0];
    if (player2Score >= 21) return [0, 1];

    let wins: [number, number] = [0, 0];

    for (const [sum, freq] of rollFrequencies) {
      if (isPlayer1Turn) {
        const newPos = move(player1Pos, sum);
        const newScore = player1Score + newPos;

        const [w1, w2] = dfs(newPos, player2Pos, newScore, player2Score, false);

        wins[0] += w1 * freq;
        wins[1] += w2 * freq;
      } else {
        const newPos = move(player2Pos, sum);
        const newScore = player2Score + newPos;

        const [w1, w2] = dfs(player1Pos, newPos, player1Score, newScore, true);

        wins[0] += w1 * freq;
        wins[1] += w2 * freq;
      }
    }

    memo.set(key, wins);
    return wins;
  }

  const [player1Wins, player2Wins] = dfs(
    player1Start,
    player2Start,
    0,
    0,
    true,
  );
  return Math.max(player1Wins, player2Wins);
}
