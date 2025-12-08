import { dist, Edge, parsePoints, UnionFind } from "./utils";

export function part2Run(lines: string[]): number {
  const points = parsePoints(lines);
  const N = points.length;

  const edges = new Array<Edge>();

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      edges.push({ d: dist(points[i], points[j]), a: i, b: j });
    }
  }

  edges.sort((e1, e2) => e1.d - e2.d);

  const uf = new UnionFind(N);
  let components = N;

  for (const e of edges) {
    if (uf.union(e.a, e.b)) {
      components--;
      if (components === 1) {
        // e.a e e.b foram os dois nós unidos pela aresta final
        const xa = points[e.a].x;
        const xb = points[e.b].x;
        return xa * xb;
      }
    }
  }

  throw new Error("Não foi possível conectar tudo (entrada inválida?)");
}
