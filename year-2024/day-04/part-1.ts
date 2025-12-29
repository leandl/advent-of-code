function countStringInAllDirections(word: string, grid: string[]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  // 8 direções possíveis (linha, coluna)
  const directions = [
    [0, 1], // direita →
    [0, -1], // esquerda ←
    [1, 0], // baixo ↓
    [-1, 0], // cima ↑
    [1, 1], // diagonal ↘
    [1, -1], // diagonal ↙
    [-1, 1], // diagonal ↗
    [-1, -1], // diagonal ↖
  ];

  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "X") continue;

      for (const [dr, dc] of directions) {
        let found = true;

        for (let i = 0; i < word.length; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          if (
            nr < 0 ||
            nr >= rows ||
            nc < 0 ||
            nc >= cols ||
            grid[nr][nc] !== word[i]
          ) {
            found = false;
            break;
          }
        }

        if (found) count++;
      }
    }
  }

  return count;
}

export function part1Run(lines: string[]): number {
  return countStringInAllDirections("XMAS", lines);
}
