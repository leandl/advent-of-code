import { BagColor, BagRule } from "./utils";

function buildReverseGraph(rules: BagRule[]): Map<BagColor, Set<BagColor>> {
  const graph = new Map<BagColor, Set<BagColor>>();

  for (const rule of rules) {
    for (const inner of rule.contains) {
      if (!graph.has(inner.color)) {
        graph.set(inner.color, new Set());
      }
      graph.get(inner.color)!.add(rule.color);
    }
  }

  return graph;
}

function countBagsThatCanContain(rules: BagRule[], target: BagColor): number {
  const graph = buildReverseGraph(rules);
  const visited = new Set<BagColor>();

  function dfs(color: BagColor) {
    const parents = graph.get(color);
    if (!parents) return;

    for (const parent of parents) {
      if (!visited.has(parent)) {
        visited.add(parent);
        dfs(parent);
      }
    }
  }

  dfs(target);

  return visited.size;
}

export function part1Run(bagRules: BagRule[]) {
  return countBagsThatCanContain(bagRules, "shiny gold");
}
