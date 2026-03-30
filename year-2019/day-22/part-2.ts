import { ShuffleOp } from "./utils";

const MOD = 119315717514047n;
const REPEATS = 101741582076661n;
const TARGET = 2020n;

function mod(n: bigint, m: bigint) {
  return ((n % m) + m) % m;
}

function modPow(base: bigint, exp: bigint, modn: bigint): bigint {
  let result = 1n;
  base = mod(base, modn);

  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % modn;
    base = (base * base) % modn;
    exp /= 2n;
  }

  return result;
}

function modInv(a: bigint, m: bigint): bigint {
  // Fermat (m é primo)
  return modPow(a, m - 2n, m);
}

export function part2Run(ops: ShuffleOp[]) {
  let a = 1n;
  let b = 0n;

  for (let i = ops.length - 1; i >= 0; i--) {
    const op = ops[i];

    if (op.type === "new_stack") {
      a = mod(-a, MOD);
      b = mod(-b - 1n, MOD);
    } else if (op.type === "cut") {
      b = mod(b + BigInt(op.n), MOD);
    } else if (op.type === "increment") {
      const inv = modInv(BigInt(op.n), MOD);
      a = mod(a * inv, MOD);
      b = mod(b * inv, MOD);
    }
  }

  // aplicar K vezes
  const ak = modPow(a, REPEATS, MOD);

  const inv = modInv(1n - a, MOD);

  const bk = mod(b * (1n - ak) * inv, MOD);

  // resultado final
  return mod(ak * TARGET + bk, MOD).toString();
}
