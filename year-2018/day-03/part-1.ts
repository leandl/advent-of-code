import { parseClaims } from "./utils";

export function part1Run(lines: string[]) {
  const claims = parseClaims(lines);
  const fabric = new Map<string, number>();

  for (const claim of claims) {
    for (let x = claim.left; x < claim.left + claim.width; x++) {
      for (let y = claim.top; y < claim.top + claim.height; y++) {
        const key = `${x},${y}`;
        fabric.set(key, (fabric.get(key) ?? 0) + 1);
      }
    }
  }

  let overlapCount = 0;
  for (const count of fabric.values()) {
    if (count >= 2) {
      overlapCount++;
    }
  }

  return overlapCount;
}
