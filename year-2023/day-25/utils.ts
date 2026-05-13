export type Graph = Map<string, Set<string>>;

export function parseGraph(lines: string[]): Graph {
  const graph: Graph = new Map();

  for (const line of lines) {
    const [left, right] = line.split(": ");
    const neighbors = right.split(" ");

    if (!graph.has(left)) graph.set(left, new Set());

    for (const n of neighbors) {
      if (!graph.has(n)) graph.set(n, new Set());

      graph.get(left)!.add(n);
      graph.get(n)!.add(left);
    }
  }

  return graph;
}

function getEdges(graph: Graph): [string, string][] {
  const edges: [string, string][] = [];
  const seen = new Set<string>();

  for (const [u, neighbors] of graph.entries()) {
    for (const v of neighbors) {
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([u, v]);
      }
    }
  }

  return edges;
}

// Karger's algorithm
export function kargerMinCut(originalGraph: Graph): {
  cut: number;
  groups: Map<string, string[]>;
} {
  // clone
  const parent = new Map<string, string>();
  const size = new Map<string, number>();

  for (const node of originalGraph.keys()) {
    parent.set(node, node);
    size.set(node, 1);
  }

  const edges = getEdges(originalGraph);

  function find(x: string): string {
    if (parent.get(x)! !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  }

  function union(a: string, b: string) {
    a = find(a);
    b = find(b);
    if (a === b) return;

    parent.set(b, a);
    size.set(a, size.get(a)! + size.get(b)!);
  }

  let remaining = originalGraph.size;

  while (remaining > 2) {
    const [u, v] = edges[Math.floor(Math.random() * edges.length)];
    const ru = find(u);
    const rv = find(v);

    if (ru !== rv) {
      union(ru, rv);
      remaining--;
    }
  }

  // count cut edges
  let cut = 0;
  for (const [u, v] of edges) {
    if (find(u) !== find(v)) {
      cut++;
    }
  }

  // build groups
  const groups = new Map<string, string[]>();
  for (const node of originalGraph.keys()) {
    const root = find(node);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(node);
  }

  return { cut, groups };
}
