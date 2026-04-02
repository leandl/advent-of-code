import { Instruction } from "./utils";

type Mask = {
  andMask: bigint;
  orMask: bigint;
};

function parseMask(maskStr: string): Mask {
  let andMask = (1n << 36n) - 1n;
  let orMask = 0n;

  maskStr.split("").forEach((bit, index) => {
    const pos = 35n - BigInt(index);
    const value = 1n << pos;

    if (bit === "1") orMask |= value;
    if (bit === "0") andMask &= ~value;
  });

  return { andMask, orMask };
}

function applyMask(value: bigint, mask: { andMask: bigint; orMask: bigint }) {
  return (value & mask.andMask) | mask.orMask;
}

export function part1Run(program: Instruction[]) {
  let currentMask: Mask = {
    andMask: (1n << 36n) - 1n,
    orMask: 0n,
  };

  const memory = new Map<bigint, bigint>();

  for (const instr of program) {
    if (instr.type === "mask") {
      currentMask = parseMask(instr.raw);
      continue;
    }

    const masked = applyMask(instr.value, currentMask);
    memory.set(instr.address, masked);
  }

  return [...memory.values()].reduce((acc, v) => acc + v, 0n);
}
