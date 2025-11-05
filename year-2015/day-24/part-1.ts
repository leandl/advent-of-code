import { combinations, product, sum } from "./utils";

// Subset-sum rápido usando bitset (bitmask em número)
function canFindSubsetWithSum(weights: number[], target: number): boolean {
  let bitset = 1n; // bit 0 set
  for (const w of weights) {
    bitset |= bitset << BigInt(w);
    if ((bitset >> BigInt(target)) & 1n) return true;
  }
  return ((bitset >> BigInt(target)) & 1n) === 1n;
}

function solveMinQEForThreeGroups(weights: number[]): number | null {
  const total = sum(weights);
  if (total % 3 !== 0) return null;
  const target = total / 3;

  // ordenar decrescente ajuda a cortar combinações rapidamente
  const sorted = [...weights].sort((a, b) => b - a);

  for (let k = 1; k <= sorted.length; k++) {
    const validQEs: number[] = [];

    for (const combo of combinations(sorted, k)) {
      const s = sum(combo);
      if (s !== target) continue;

      // construir lista restante
      const remaining = [...sorted];
      for (const x of combo) {
        const idx = remaining.indexOf(x);
        if (idx >= 0) remaining.splice(idx, 1);
      }

      // verificar se remaining pode formar subset soma target
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

export function part1Run(lines: string[]) {
  return solveMinQEForThreeGroups(lines.map(Number));
}
