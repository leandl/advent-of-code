import { instructions, parseInstruction, Register } from "./utils";

export function part2Run(lines: string[]) {
  let registers: Record<Register, number> = {
    a: 1,
    b: 0,
  };

  let currentLine = 0;
  const SIZE_LINE_PROGRAM = lines.length;
  while (currentLine < SIZE_LINE_PROGRAM) {
    const line = lines[currentLine]!;

    const instruction = parseInstruction(line);
    if (!instruction) {
      continue;
    }

    const keyInstruction = instruction[0];
    const functionInstruction = instructions[keyInstruction];

    const result = functionInstruction(registers, instruction, currentLine);

    registers = result.registers;
    currentLine = result.nextLine;
  }

  return registers.b;
}
