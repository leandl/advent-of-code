export function buildGraph(lines: string[]): Map<string, string[]> {
  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const [a, b] = line.split("-");

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  }

  return graph;
}
