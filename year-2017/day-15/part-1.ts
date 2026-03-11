import { FACTOR_A, FACTOR_B, MOD } from "./utils";

const PAIRS = 40_000_000;

export function part1Run(startA: number, startB: number) {
  let a = startA;
  let b = startB;
  let matches = 0;

  for (let i = 0; i < PAIRS; i++) {
    a = (a * FACTOR_A) % MOD;
    b = (b * FACTOR_B) % MOD;

    if ((a & 0xffff) === (b & 0xffff)) {
      matches++;
    }
  }

  return matches;
}
