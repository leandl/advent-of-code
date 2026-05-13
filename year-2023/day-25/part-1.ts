import { kargerMinCut, Graph } from "./utils";

export function part1Run(graph: Graph) {
  while (true) {
    const { cut, groups } = kargerMinCut(graph);

    if (cut === 3 && groups.size === 2) {
      const sizes = Array.from(groups.values()).map((g) => g.length);
      return sizes[0] * sizes[1];
    }
  }
}
