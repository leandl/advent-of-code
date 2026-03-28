import { IntcodeComputer } from "../../utils/intcode-computer";
import { Grid } from "../../utils/parsers";

export type Position = { x: number; y: number };
export type MovePosition = { dx: number; dy: number };

export enum Direction {
  NORTH = 1,
  SOUTH = 2,
  WEST = 3,
  EAST = 4,
}

export const DIRS: Record<Direction, MovePosition> = {
  [Direction.NORTH]: { dx: 0, dy: -1 },
  [Direction.SOUTH]: { dx: 0, dy: 1 },
  [Direction.WEST]: { dx: -1, dy: 0 },
  [Direction.EAST]: { dx: 1, dy: 0 },
};

export const OPPOSITE: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.NORTH,
  [Direction.WEST]: Direction.EAST,
  [Direction.EAST]: Direction.WEST,
};

export function getGrid(program: number[]): Grid<string> {
  const computer = new IntcodeComputer([...program]);
  const output: number[] = [];

  computer.run({
    input: () => 0,
    output: (value) => output.push(value),
  });

  const text = output.map((c) => String.fromCharCode(c)).join("");

  const grid = text
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  return grid;
}

function turnLeft(dir: Direction): Direction {
  switch (dir) {
    case Direction.NORTH:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.NORTH;
  }
}

function turnRight(dir: Direction): Direction {
  switch (dir) {
    case Direction.NORTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.NORTH;
  }
}

export function isScaffold(grid: Grid<string>, pos: Position): boolean {
  const c = grid[pos.y]?.[pos.x];
  return c !== undefined && "#^v<>".includes(c);
}

export function move(pos: Position, dir: Direction): Position {
  const d = DIRS[dir];
  return { x: pos.x + d.dx, y: pos.y + d.dy };
}

export function buildPath(grid: Grid<string>): string[] {
  let pos: Position = { x: 0, y: 0 };
  let dir: Direction = Direction.NORTH;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];

      if ("^v<>".includes(c)) {
        pos = { x, y };

        if (c === "^") dir = Direction.NORTH;
        else if (c === "v") dir = Direction.SOUTH;
        else if (c === "<") dir = Direction.WEST;
        else if (c === ">") dir = Direction.EAST;
      }
    }
  }

  const path: string[] = [];

  while (true) {
    let steps = 0;

    while (true) {
      const next = move(pos, dir);
      if (!isScaffold(grid, next)) break;

      pos = next;
      steps++;
    }

    if (steps > 0) {
      path.push(String(steps));
    }

    const leftDir = turnLeft(dir);
    const rightDir = turnRight(dir);

    if (isScaffold(grid, move(pos, leftDir))) {
      path.push("L");
      dir = leftDir;
    } else if (isScaffold(grid, move(pos, rightDir))) {
      path.push("R");
      dir = rightDir;
    } else {
      break; // fim
    }
  }

  return path;
}

export function compress(path: string[]) {
  const MAX_LEN = 20;

  function toStr(seq: string[]) {
    return seq.join(",");
  }

  function fits(seq: string[]) {
    return toStr(seq).length <= MAX_LEN;
  }

  function match(path: string[], i: number, pattern: string[]) {
    if (i + pattern.length > path.length) return false;
    for (let j = 0; j < pattern.length; j++) {
      if (path[i + j] !== pattern[j]) return false;
    }
    return true;
  }

  function dfs(
    i: number,
    patterns: string[][],
    main: string[],
  ): { main: string[]; patterns: string[][] } | null {
    // terminou o path inteiro
    if (i === path.length) {
      if (main.join(",").length <= MAX_LEN) {
        return { main, patterns };
      }
      return null;
    }

    // tenta usar padrões existentes (A/B/C)
    for (let p = 0; p < patterns.length; p++) {
      const pat = patterns[p];

      if (match(path, i, pat)) {
        const res = dfs(i + pat.length, patterns, [
          ...main,
          ["A", "B", "C"][p],
        ]);
        if (res) return res;
      }
    }

    // tenta criar novo padrão (se ainda temos < 3)
    if (patterns.length < 3) {
      for (let len = 2; len <= 10; len++) {
        const candidate = path.slice(i, i + len);

        if (!fits(candidate)) break;

        const res = dfs(
          i + len,
          [...patterns, candidate],
          [...main, ["A", "B", "C"][patterns.length]],
        );

        if (res) return res;
      }
    }

    return null;
  }

  const result = dfs(0, [], []);
  if (!result) {
    throw new Error("No valid compression found");
  }

  const [A, B, C] = result.patterns;

  return {
    main: result.main,
    A,
    B,
    C,
  };
}
