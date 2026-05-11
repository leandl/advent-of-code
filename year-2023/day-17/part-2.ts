import { MinHeap } from "../../utils/min-heap";
import { Dir, DIRS } from "./utils";

export function part2Run(grid: number[][]) {
  const rows = grid.length;
  const cols = grid[0].length;

  // dist[r][c][dir][steps]
  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      Array.from({ length: 4 }, () => Array(11).fill(Infinity)),
    ),
  );

  const heap = new MinHeap<[number, number, number, Dir, number]>(
    (a, b) => a[0] - b[0],
  );

  function push(cost: number, r: number, c: number, d: Dir, s: number) {
    if (cost < dist[r][c][d][s]) {
      dist[r][c][d][s] = cost;
      heap.push([cost, r, c, d, s]);
    }
  }

  // start
  for (let d = 0 as Dir; d < 4; d++) {
    const [dr, dc] = DIRS[d];
    const nr = dr;
    const nc = dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      push(grid[nr][nc], nr, nc, d, 1);
    }
  }

  while (heap.length !== 0) {
    const [cost, r, c, dir, steps] = heap.pop()!;

    if (cost > dist[r][c][dir][steps]) continue;

    if (r === rows - 1 && c === cols - 1 && steps >= 4) {
      return cost;
    }

    // forward
    if (steps < 10) {
      const [dr, dc] = DIRS[dir];
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        push(cost + grid[nr][nc], nr, nc, dir, steps + 1);
      }
    }

    // turn
    if (steps >= 4) {
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
  }

  return -1;
}
