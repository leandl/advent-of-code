import { dist, Edge, parsePoints, UnionFind } from "./utils";

export function part1Run(lines: string[]): number {
  const points = parsePoints(lines);
  const N = points.length;

  const edges = new Array<Edge>();

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      edges.push({
        d: dist(points[i], points[j]),
        a: i,
        b: j,
      });
    }
  }

  // Ordena do menor para o maior
  edges.sort((p1, p2) => p1.d - p2.d);

  const uf = new UnionFind(N);
  let processed = 0;
  for (const p of edges) {
    uf.union(p.a, p.b);
    processed++;
    if (processed === 1000) break;
  }

  const sizes = uf.getComponentSizes().sort((a, b) => b - a);

  return sizes[0] * sizes[1] * sizes[2];
}
