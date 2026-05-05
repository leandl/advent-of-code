import { Board, Dir, DIRS, Instruction } from "./utils";

export function part1Run([{ grid, width, height }, instructions]: [
  Board,
  Instruction[],
]) {
  let row = 0;
  let col = grid[0].indexOf(".");
  let dir: Dir = 0;

  function wrap(r: number, c: number, d: Dir): [number, number] {
    if (d === 0) {
      let nc = 0;
      while (grid[r][nc] === " ") nc++;
      return [r, nc];
    }
    if (d === 2) {
      let nc = width - 1;
      while (grid[r][nc] === " ") nc--;
      return [r, nc];
    }
    if (d === 1) {
      let nr = 0;
      while (grid[nr][c] === " ") nr++;
      return [nr, c];
    }
    if (d === 3) {
      let nr = height - 1;
      while (grid[nr][c] === " ") nr--;
      return [nr, c];
    }

    throw new Error("invalid dir");
  }

  for (const instr of instructions) {
    if (instr === "L") {
      dir = ((dir + 3) % 4) as Dir;
      continue;
    }
    if (instr === "R") {
      dir = ((dir + 1) % 4) as Dir;
      continue;
    }

    for (let i = 0; i < instr; i++) {
      let [dr, dc] = DIRS[dir];
      let nr = row + dr;
      let nc = col + dc;

      if (
        nr < 0 ||
        nr >= height ||
        nc < 0 ||
        nc >= width ||
        grid[nr][nc] === " "
      ) {
        [nr, nc] = wrap(row, col, dir);
      }

      if (grid[nr][nc] === "#") break;

      row = nr;
      col = nc;
    }
  }

  return 1000 * (row + 1) + 4 * (col + 1) + dir;
}
