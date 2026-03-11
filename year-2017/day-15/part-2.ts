import { FACTOR_A, FACTOR_B, MOD } from "./utils";

const MULTIPLE_A = 4;
const MULTIPLE_B = 8;

const PAIRS = 5_000_000;

function nextValue(prev: number, factor: number): number {
  return (prev * factor) % MOD;
}

function nextValid(prev: number, factor: number, multiple: number): number {
  let value = prev;

  do {
    value = nextValue(value, factor);
  } while (value % multiple !== 0);

  return value;
}

export function part2Run(startA: number, startB: number) {
  let a = startA;
  let b = startB;
  let matches = 0;

  for (let i = 0; i < PAIRS; i++) {
    a = nextValid(a, FACTOR_A, MULTIPLE_A);
    b = nextValid(b, FACTOR_B, MULTIPLE_B);

    if ((a & 0xffff) === (b & 0xffff)) {
      matches++;
    }
  }

  return matches;
}
