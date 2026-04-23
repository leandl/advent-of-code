export type Valve = {
  name: string;
  flow: number;
  tunnels: string[];
};

export function parseGraph(lines: string[]): Map<string, Valve> {
  const map = new Map<string, Valve>();

  for (const line of lines) {
    const match = line.match(
      /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/,
    );
    if (!match) throw new Error("linha inválida");

    const [, name, flow, tunnels] = match;

    map.set(name, {
      name,
      flow: Number(flow),
      tunnels: tunnels.split(", ").map((s) => s.trim()),
    });
  }

  return map;
}

// BFS para distâncias
export function computeDistances(graph: Map<string, Valve>) {
  const dist = new Map<string, Map<string, number>>();

  for (const start of graph.keys()) {
    const queue: [string, number][] = [[start, 0]];
    const visited = new Set<string>([start]);
    const dmap = new Map<string, number>();

    while (queue.length) {
      const [cur, d] = queue.shift()!;
      dmap.set(cur, d);

      for (const nxt of graph.get(cur)!.tunnels) {
        if (!visited.has(nxt)) {
          visited.add(nxt);
          queue.push([nxt, d + 1]);
        }
      }
    }

    dist.set(start, dmap);
  }

  return dist;
}
