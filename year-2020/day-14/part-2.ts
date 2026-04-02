import { Instruction } from "./utils";

type Mask = {
  orMask: bigint;
  floatingBits: bigint[]; // posições dos X
};

function parseMask(maskStr: string): Mask {
  let orMask = 0n;
  const floatingBits: bigint[] = [];

  maskStr.split("").forEach((bit, index) => {
    const pos = 35n - BigInt(index);
    const value = 1n << pos;

    if (bit === "1") {
      orMask |= value;
    } else if (bit === "X") {
      floatingBits.push(value);
    }
  });

  return { orMask, floatingBits };
}

function generateAddresses(baseAddress: bigint, mask: Mask): bigint[] {
  // aplica os bits forçados (1)
  const base = baseAddress | mask.orMask;

  const results: bigint[] = [];

  const total = 1 << mask.floatingBits.length;

  for (let i = 0; i < total; i++) {
    let address = base;

    mask.floatingBits.forEach((bit, index) => {
      const isSet = (i >> index) & 1;

      if (isSet) {
        address |= bit; // seta 1
      } else {
        address &= ~bit; // seta 0
      }
    });

    results.push(address);
  }

  return results;
}

export function part2Run(program: Instruction[]) {
  let currentMask: Mask = {
    orMask: 0n,
    floatingBits: [],
  };

  const memory = new Map<bigint, bigint>();

  for (const instr of program) {
    if (instr.type === "mask") {
      currentMask = parseMask(instr.raw);
      continue;
    }

    const addresses = generateAddresses(instr.address, currentMask);

    for (const addr of addresses) {
      memory.set(addr, instr.value);
    }
  }

  return [...memory.values()].reduce((acc, v) => acc + v, 0n);
}
