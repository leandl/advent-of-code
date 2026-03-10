import { knotHash } from "./utils";

function hexToBits(hex: string): number[] {
  return [...hex]
    .map((c) => parseInt(c, 16).toString(2).padStart(4, "0"))
    .join("")
    .split("")
    .map(Number);
}

function buildGrid(key: string): number[][] {
  const grid: number[][] = [];

  for (let row = 0; row < 128; row++) {
    const hash = knotHash(`${key}-${row}`);
    grid.push(hexToBits(hash));
  }

  return grid;
}

export function part2Run(key: string) {
  const grid = buildGrid(key);
  const visited = Array.from({ length: 128 }, () => Array(128).fill(false));

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r: number, c: number) {
    const stack = [[r, c]];

    while (stack.length) {
      const [x, y] = stack.pop()!;

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < 128 &&
          ny >= 0 &&
          ny < 128 &&
          !visited[nx][ny] &&
          grid[nx][ny] === 1
        ) {
          visited[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
    }
  }

  let regions = 0;

  for (let r = 0; r < 128; r++) {
    for (let c = 0; c < 128; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        regions++;
        visited[r][c] = true;
        dfs(r, c);
      }
    }
  }

  return regions;
}
