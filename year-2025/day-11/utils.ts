export type Graph = Map<string, string[]>;
export function parseGraph(lines: string[]): Graph {
  const graph: Graph = new Map();

  for (const line of lines) {
    // Exemplo: "aaa: bbb ccc ddd"
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (!match) continue;

    const [, source, rawTargets] = match;
    const targets = rawTargets ? rawTargets.trim().split(/\s+/) : [];

    graph.set(source, targets);
  }

  return graph;
}
