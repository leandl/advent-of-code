type Point = { x: number; y: number; z: number };
export type Edge = { d: number; a: number; b: number };

export function parsePoints(lines: string[]): Point[] {
  return lines.map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });
}

export function dist(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export class UnionFind {
  parent: number[];
  size: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array.from({ length: n }, () => 1);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return false;

    // Union by size
    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
    return true;
  }

  getComponentSizes(): number[] {
    const sizes: Record<number, number> = {};

    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      sizes[root] = (sizes[root] || 0) + 1;
    }

    return Object.values(sizes);
  }
}
