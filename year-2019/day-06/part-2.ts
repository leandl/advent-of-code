import { OrbitMap } from "./utils";

type Graph = Map<string, string[]>;

function buildGraph(orbits: OrbitMap): Graph {
  const graph: Graph = new Map();

  function addEdge(a: string, b: string) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  }

  for (const [center, orbiters] of orbits.entries()) {
    for (const orbiter of orbiters) {
      addEdge(center, orbiter);
    }
  }

  return graph;
}

function findParent(orbits: OrbitMap, target: string): string {
  for (const [center, orbiters] of orbits.entries()) {
    if (orbiters.includes(target)) {
      return center;
    }
  }
  throw new Error(`Parent not found for ${target}`);
}

export function part2Run(orbits: OrbitMap) {
  const graph = buildGraph(orbits);

  const start = findParent(orbits, "YOU");
  const end = findParent(orbits, "SAN");

  const queue: Array<{ node: string; dist: number }> = [
    { node: start, dist: 0 },
  ];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const { node, dist } = queue.shift()!;

    if (node === end) {
      return dist;
    }

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ node: neighbor, dist: dist + 1 });
      }
    }
  }

  throw new Error("No path found between YOU and SAN");
}
