import {
  buildSystem,
  Hail3DData,
  solveLinear,
  toHailArray,
  validate,
} from "./utils";

export function part2Run(data: Hail3DData): number {
  const hailstones = toHailArray(data);
  const n = hailstones.length;

  function trySolve(i: number, j: number, k: number) {
    const h0 = hailstones[i];
    const h1 = hailstones[j];
    const h2 = hailstones[k];

    const { A, b } = buildSystem([h0, h1, h2]);
    const res = solveLinear(A, b);

    if (!res) return null;
    if (res.some((x) => !Number.isFinite(x))) return null;

    return res;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const sol = trySolve(i, j, k);
        if (!sol) continue;

        if (!validate(sol, hailstones)) continue;

        const [rx, ry, rz] = sol;
        return Math.round(rx + ry + rz);
      }
    }
  }

  throw new Error("No solution");
}
