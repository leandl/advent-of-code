import { Diretory } from "./utils";

function calculateSizes(dir: Diretory): [number, number] {
  let total = 0;
  let sum = 0;

  for (const child of dir.children.values()) {
    if (child.type === "FILE") {
      total += child.size;
    } else {
      const [childTotal, childSum] = calculateSizes(child);
      total += childTotal;
      sum += childSum;
    }
  }

  if (total <= 100000) {
    sum += total;
  }

  return [total, sum];
}

export function part1Run(root: Diretory) {
  const [, sum] = calculateSizes(root);
  return sum;
}
