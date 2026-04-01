import { Grid } from "../../utils/parsers";

type Levels = Map<number, Grid>;

const SIZE = 5;

const dirs = [
  [-1, 0], // cima
  [1, 0], // baixo
  [0, -1], // esquerda
  [0, 1], // direita
];

function emptyGrid(): Grid<string> {
  return Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => "."),
  );
}

function cloneGrid(grid: Grid<string>): Grid<string> {
  return grid.map((row) => [...row]);
}

function countNeighbors(
  levels: Levels,
  depth: number,
  x: number,
  y: number,
): number {
  let count = 0;

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0) {
      if (levels.get(depth - 1)?.[1][2] === "#") count++;
      continue;
    }
    if (nx >= SIZE) {
      if (levels.get(depth - 1)?.[3][2] === "#") count++;
      continue;
    }
    if (ny < 0) {
      if (levels.get(depth - 1)?.[2][1] === "#") count++;
      continue;
    }
    if (ny >= SIZE) {
      if (levels.get(depth - 1)?.[2][3] === "#") count++;
      continue;
    }

    if (nx === 2 && ny === 2) {
      const inner = levels.get(depth + 1);
      if (!inner) continue;

      if (x === 1 && y === 2) {
        // vindo de cima → linha 0
        for (let i = 0; i < SIZE; i++) if (inner[0][i] === "#") count++;
      } else if (x === 3 && y === 2) {
        // vindo de baixo → linha 4
        for (let i = 0; i < SIZE; i++) if (inner[4][i] === "#") count++;
      } else if (x === 2 && y === 1) {
        // vindo da esquerda → coluna 0
        for (let i = 0; i < SIZE; i++) if (inner[i][0] === "#") count++;
      } else if (x === 2 && y === 3) {
        // vindo da direita → coluna 4
        for (let i = 0; i < SIZE; i++) if (inner[i][4] === "#") count++;
      }

      continue;
    }

    // 🟢 Mesmo nível
    if (levels.get(depth)?.[nx][ny] === "#") count++;
  }

  return count;
}

function step(levels: Levels): Levels {
  const newLevels: Levels = new Map();

  const depths = [...levels.keys()];
  const min = Math.min(...depths);
  const max = Math.max(...depths);

  for (let d = min - 1; d <= max + 1; d++) {
    const grid = levels.get(d) ?? emptyGrid();
    const newGrid = emptyGrid();

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (i === 2 && j === 2) {
          newGrid[i][j] = "?";
          continue;
        }

        const neighbors = countNeighbors(levels, d, i, j);
        const cell = grid[i][j];

        if (cell === "#") {
          newGrid[i][j] = neighbors === 1 ? "#" : ".";
        } else {
          newGrid[i][j] = neighbors === 1 || neighbors === 2 ? "#" : ".";
        }
      }
    }

    newLevels.set(d, newGrid);
  }

  return newLevels;
}

function countBugs(levels: Levels): number {
  let total = 0;

  for (const grid of levels.values()) {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (grid[i][j] === "#") total++;
      }
    }
  }

  return total;
}

export function part2Run(initial: Grid<string>, minutes: number = 200) {
  const levels: Levels = new Map();

  initial[2][2] = "?"; // centro

  levels.set(0, initial);

  for (let i = 0; i < minutes; i++) {
    const next = step(levels);
    levels.clear();
    for (const [k, v] of next) levels.set(k, v);
  }

  return countBugs(levels);
}
