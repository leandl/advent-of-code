import { Grid } from "../../utils/parsers";

type State = {
  x: number;
  y: number;
  keys: number;
  steps: number;
};

export function part1Run(grid: Grid<string>): number {
  const h = grid.length;
  const w = grid[0].length;

  let startX = 0;
  let startY = 0;
  let totalKeys = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = grid[y][x];

      if (c === "@") {
        startX = x;
        startY = y;
      }

      if (c >= "a" && c <= "z") {
        totalKeys |= 1 << (c.charCodeAt(0) - 97);
      }
    }
  }

  const queue: State[] = [
    {
      x: startX,
      y: startY,
      keys: 0,
      steps: 0,
    },
  ];

  const visited = new Set<string>();

  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  while (queue.length > 0) {
    const { x, y, keys, steps } = queue.shift()!;

    const stateKey = `${x},${y},${keys}`;
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    if (keys === totalKeys) {
      return steps;
    }

    for (const { dx, dy } of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      const cell = grid[ny]?.[nx];
      if (!cell || cell === "#") continue;

      let newKeys = keys;

      if (cell >= "A" && cell <= "Z") {
        const needed = 1 << (cell.charCodeAt(0) - 65);
        if ((keys & needed) === 0) continue;
      }

      if (cell >= "a" && cell <= "z") {
        newKeys |= 1 << (cell.charCodeAt(0) - 97);
      }

      queue.push({
        x: nx,
        y: ny,
        keys: newKeys,
        steps: steps + 1,
      });
    }
  }

  return -1;
}
