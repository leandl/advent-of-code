import { canFindSubsetWithSum, combinations, product, sum } from "./utils";

function solveMinQEForFourGroups(weights: number[]): number | null {
  const total = sum(weights);
  if (total % 4 !== 0) return null;

  const target = total / 4;
  const sorted = [...weights].sort((a, b) => b - a);

  for (let k = 1; k <= sorted.length; k++) {
    const validQEs: number[] = [];

    for (const combo of combinations(sorted, k)) {
      if (sum(combo) !== target) continue;

      const remaining = [...sorted];
      for (const x of combo) {
        const idx = remaining.indexOf(x);
        if (idx >= 0) remaining.splice(idx, 1);
      }

      // Para 4 grupos, precisamos que os restantes possam formar 3 grupos de soma target
      // Basta checar se existe pelo menos um subset de soma target nos restantes
      if (canFindSubsetWithSum(remaining, target)) {
        validQEs.push(product(combo));
      }
    }

    if (validQEs.length > 0) {
      return Math.min(...validQEs);
    }
  }

  return null;
}

export function part2Run(lines: string[]) {
  return solveMinQEForFourGroups(lines.map(Number));
}
