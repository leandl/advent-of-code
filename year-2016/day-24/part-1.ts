import { bfs, permutations, RunParams } from "./utils";

export function part1Run({ grid, points }: RunParams) {
  const ids = [...points.keys()].sort((a, b) => a - b);

  // dist[a][b]
  const dist: Record<number, Record<number, number>> = {};

  for (const a of ids) {
    dist[a] = {};
    const map = bfs(grid, points.get(a)!);

    for (const b of ids) {
      const p = points.get(b)!;
      dist[a][b] = map.get(`${p.x},${p.y}`)!;
    }
  }

  const others = ids.filter((x) => x !== 0);

  let best = Infinity;

  for (const perm of permutations(others)) {
    let cur = 0;
    let total = 0;

    for (const next of perm) {
      total += dist[cur][next];
      cur = next;
    }

    best = Math.min(best, total);
  }

  return best;
}
