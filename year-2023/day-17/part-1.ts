import { Grid } from "../../utils/parsers";
import { Dir, DIRS } from "./utils";

export function part1Run(grid: Grid<number>) {
  const rows = grid.length;
  const cols = grid[0].length;

  // dist[r][c][dir][steps]
  const dist = new Map<string, number>();

  const pq: [number, number, number, Dir, number][] = [];
  // [cost, r, c, dir, steps]

  function key(r: number, c: number, d: Dir, s: number) {
    return `${r},${c},${d},${s}`;
  }

  function push(cost: number, r: number, c: number, d: Dir, s: number) {
    const k = key(r, c, d, s);
    if (!dist.has(k) || cost < dist.get(k)!) {
      dist.set(k, cost);
      pq.push([cost, r, c, d, s]);
    }
  }

  // inicial: pode começar em qualquer direção
  for (let d = 0 as Dir; d < 4; d++) {
    const [dr, dc] = DIRS[d];
    const nr = 0 + dr;
    const nc = 0 + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      push(grid[nr][nc], nr, nc, d, 1);
    }
  }

  while (pq.length) {
    // priority queue simples (pode otimizar com heap)
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, r, c, dir, steps] = pq.shift()!;

    if (r === rows - 1 && c === cols - 1) {
      return cost;
    }

    // continuar reto
    if (steps < 3) {
      const [dr, dc] = DIRS[dir];
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        push(cost + grid[nr][nc], nr, nc, dir, steps + 1);
      }
    }

    // virar esquerda/direita
    for (const turn of [-1, 1]) {
      const ndir = ((dir + turn + 4) % 4) as Dir;

      const [dr, dc] = DIRS[ndir];
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        push(cost + grid[nr][nc], nr, nc, ndir, 1);
      }
    }
  }

  return -1;
}
