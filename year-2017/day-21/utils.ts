import { Grid } from "../../utils/parsers";

function parsePattern(pattern: string): Grid {
  return pattern.split("/").map((r) => r.split(""));
}

function gridKey(grid: Grid): string {
  return grid.map((r) => r.join("")).join("/");
}

function rotate(grid: Grid): Grid {
  const n = grid.length;
  const res: Grid = Array.from({ length: n }, () => Array(n).fill(""));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      res[x][n - 1 - y] = grid[y][x];
    }
  }

  return res;
}

function flip(grid: Grid): Grid {
  return grid.map((r) => [...r].reverse());
}

function variants(grid: Grid): Grid[] {
  const result: Grid[] = [];
  let g = grid;

  for (let i = 0; i < 4; i++) {
    result.push(g);
    result.push(flip(g));
    g = rotate(g);
  }

  return result;
}

export function parseRules(lines: string[]): Map<string, Grid> {
  const rules = new Map<string, Grid>();

  for (const line of lines) {
    const [input, output] = line.split(" => ");

    const inGrid = parsePattern(input);
    const outGrid = parsePattern(output);

    for (const v of variants(inGrid)) {
      rules.set(gridKey(v), outGrid);
    }
  }

  return rules;
}

function splitGrid(grid: Grid, size: number): Grid[][] {
  const n = grid.length;
  const blocks: Grid[][] = [];

  for (let y = 0; y < n; y += size) {
    const row: Grid[] = [];

    for (let x = 0; x < n; x += size) {
      const block: Grid = [];

      for (let dy = 0; dy < size; dy++) {
        block.push(grid[y + dy].slice(x, x + size));
      }

      row.push(block);
    }

    blocks.push(row);
  }

  return blocks;
}

function joinBlocks(blocks: Grid[][]): Grid {
  const blockSize = blocks[0][0].length;
  const result: Grid = [];

  for (const row of blocks) {
    for (let i = 0; i < blockSize; i++) {
      const line: string[] = [];

      for (const block of row) {
        line.push(...block[i]);
      }

      result.push(line);
    }
  }

  return result;
}

export function enhance(
  grid: Grid,
  rules: Map<string, Grid>,
  cache: Map<string, Grid>,
): Grid {
  const size = grid.length;
  const blockSize = size % 2 === 0 ? 2 : 3;

  const blocks = splitGrid(grid, blockSize);

  const enhanced = blocks.map((row) =>
    row.map((block) => {
      const key = gridKey(block);

      if (cache.has(key)) return cache.get(key)!;

      const rule = rules.get(key);
      if (!rule) throw new Error("Rule not found: " + key);

      cache.set(key, rule);
      return rule;
    }),
  );

  return joinBlocks(enhanced);
}
