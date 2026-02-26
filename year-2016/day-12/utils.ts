type Registers = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export type Instruction =
  | { type: "cpy"; x: string; y: string }
  | { type: "inc"; x: string }
  | { type: "dec"; x: string }
  | { type: "jnz"; x: string; y: string };

function parseInstruction(line: string): Instruction {
  const parts = line.trim().split(" ");

  switch (parts[0]) {
    case "cpy":
      return { type: "cpy", x: parts[1], y: parts[2] };
    case "inc":
      return { type: "inc", x: parts[1] };
    case "dec":
      return { type: "dec", x: parts[1] };
    case "jnz":
      return { type: "jnz", x: parts[1], y: parts[2] };
    default:
      throw new Error("Unknown instruction: " + line);
  }
}

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map(parseInstruction);
}

function getValue(x: string, registers: Registers): number {
  if (["a", "b", "c", "d"].includes(x)) {
    return registers[x as keyof Registers];
  }
  return parseInt(x, 10);
}

export function runProgram(
  instructions: Instruction[],
  registers: Registers,
): Registers {
  let ip = 0;

  while (ip >= 0 && ip < instructions.length) {
    const instr = instructions[ip];

    switch (instr.type) {
      case "cpy":
        if (["a", "b", "c", "d"].includes(instr.y)) {
          registers[instr.y as keyof Registers] = getValue(instr.x, registers);
        }
        ip++;
        break;

      case "inc":
        registers[instr.x as keyof Registers]++;
        ip++;
        break;

      case "dec":
        registers[instr.x as keyof Registers]--;
        ip++;
        break;

      case "jnz":
        if (getValue(instr.x, registers) !== 0) {
          ip += getValue(instr.y, registers);
        } else {
          ip++;
        }
        break;
    }
  }

  return registers;
}
