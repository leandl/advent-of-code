import { manhattan, Point } from "./utils";

class DSU {
  parent: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a: number, b: number) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) {
      this.parent[rb] = ra;
    }
  }
}

export function part1Run(points: Point[]) {
  const n = points.length;

  const dsu = new DSU(n);

  // conecta pontos próximos
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (manhattan(points[i], points[j]) <= 3) {
        dsu.union(i, j);
      }
    }
  }

  // conta componentes
  const roots = new Set<number>();
  for (let i = 0; i < n; i++) {
    roots.add(dsu.find(i));
  }

  return roots.size;
}
