import {
  ChronalProgramInput,
  cloneRegisters,
  equalRegisters,
  operations,
  Registers,
} from "./utils";

export function part2Run({ samples, program }: ChronalProgramInput) {
  const opNames = Object.keys(operations);

  // opcode -> possíveis operações
  const possible = new Map<number, Set<string>>();

  for (let i = 0; i < 16; i++) {
    possible.set(i, new Set(opNames));
  }

  // 🔍 filtrar usando samples
  for (const { before, instruction, after } of samples) {
    const [opcode, a, b, c] = instruction;

    const valid = new Set<string>();

    for (const [name, op] of Object.entries(operations)) {
      const regs = cloneRegisters(before);
      op(regs, a, b, c);

      if (equalRegisters(regs, after)) {
        valid.add(name);
      }
    }

    const current = possible.get(opcode)!;

    possible.set(opcode, new Set([...current].filter((x) => valid.has(x))));
  }

  const resolved = new Map<number, string>();

  while (resolved.size < 16) {
    for (const [opcode, set] of possible) {
      if (set.size === 1) {
        const opName = [...set][0];

        if (resolved.has(opcode)) continue;

        resolved.set(opcode, opName);

        for (const [otherOpcode, otherSet] of possible) {
          if (otherOpcode !== opcode) {
            otherSet.delete(opName);
          }
        }
      }
    }
  }

  const regs: Registers = [0, 0, 0, 0];

  for (const [opcode, a, b, c] of program) {
    const opName = resolved.get(opcode)!;
    const op = operations[opName];

    op(regs, a, b, c);
  }

  return regs[0];
}
