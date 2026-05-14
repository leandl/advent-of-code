import { Grid } from "../../utils/parsers";

export function part1Run(grid: Grid<string>): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(sr: number, sc: number): number {
    const plant = grid[sr][sc];
    const queue: [number, number][] = [[sr, sc]];
    visited[sr][sc] = true;

    let qi = 0;
    let area = 0;
    let perimeter = 0;

    while (qi < queue.length) {
      const [r, c] = queue[qi++];
      area++;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        // Fora do grid → conta perímetro
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
          perimeter++;
          continue;
        }

        // Tipo diferente → conta perímetro
        if (grid[nr][nc] !== plant) {
          perimeter++;
          continue;
        }

        // Mesmo tipo e não visitado → expande região
        if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    return area * perimeter;
  }

  let total = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        total += bfs(r, c);
      }
    }
  }

  return total;
}
