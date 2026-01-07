export function parseInput(input: string): number[] {
  return input.trim().split(",").map(Number);
}

export function runIntcode(program: number[]): number[] {
  const memory = [...program];

  for (let pointer = 0; pointer < memory.length; pointer += 4) {
    const opcode = memory[pointer];

    if (opcode === 99) {
      break;
    }

    if (opcode !== 1 && opcode !== 2) {
      throw new Error(`Opcode inválido: ${opcode}`);
    }

    const inputPosA = memory[pointer + 1];
    const inputPosB = memory[pointer + 2];
    const outputIndex = memory[pointer + 3];

    const inputA = memory[inputPosA];
    const inputB = memory[inputPosB];

    if (opcode === 1) {
      memory[outputIndex] = inputA + inputB;
    } else {
      memory[outputIndex] = inputA * inputB;
    }
  }

  return memory;
}

export function restoreGravityAssist(
  program: number[],
  noun: number,
  verb: number
): number[] {
  const restored = [...program];
  restored[1] = noun;
  restored[2] = verb;
  return restored;
}
