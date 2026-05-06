import { Grid } from "../../utils/parsers";

type Point = {
  r: number;
  c: number;
};

export function cosmicExpansion(
  grid: Grid<string>,
  expansionFactor: number = 2,
): number {
  const EXPANSION = expansionFactor - 1;

  const rows = grid.length;
  const cols = grid[0].length;

  const galaxies: Point[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "#") {
        galaxies.push({ r, c });
      }
    }
  }

  const emptyRows = new Set<number>();
  for (let r = 0; r < rows; r++) {
    if (!grid[r].includes("#")) {
      emptyRows.add(r);
    }
  }

  const emptyCols = new Set<number>();
  for (let c = 0; c < cols; c++) {
    let hasGalaxy = false;
    for (let r = 0; r < rows; r++) {
      if (grid[r][c] === "#") {
        hasGalaxy = true;
        break;
      }
    }
    if (!hasGalaxy) {
      emptyCols.add(c);
    }
  }

  const rowOffset: number[] = Array(rows).fill(0);
  const colOffset: number[] = Array(cols).fill(0);

  let count = 0;
  for (let r = 0; r < rows; r++) {
    rowOffset[r] = count;
    if (emptyRows.has(r)) count++;
  }

  count = 0;
  for (let c = 0; c < cols; c++) {
    colOffset[c] = count;
    if (emptyCols.has(c)) count++;
  }

  const expanded: Point[] = galaxies.map((g) => ({
    r: g.r + rowOffset[g.r] * EXPANSION,
    c: g.c + colOffset[g.c] * EXPANSION,
  }));

  let total = 0;

  for (let i = 0; i < expanded.length; i++) {
    for (let j = i + 1; j < expanded.length; j++) {
      const a = expanded[i];
      const b = expanded[j];
      total += Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
    }
  }

  return total;
}
