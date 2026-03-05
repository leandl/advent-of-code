import { Node } from "./utils";

export function part1Run(nodes: Node[]): number {
  let count = 0;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      const A = nodes[i];
      const B = nodes[j];

      if (A.used === 0) continue;

      if (A.used <= B.avail) {
        count++;
      }
    }
  }

  return count;
}
