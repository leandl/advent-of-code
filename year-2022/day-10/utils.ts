type InstructionNoop = { type: "noop" };
type InstructionAddx = { type: "addx"; value: number };

export type Instruction = InstructionNoop | InstructionAddx;

export function parseProgram(lines: string[]): Instruction[] {
  return lines.map((line) => {
    if (line === "noop") {
      return { type: "noop" };
    }

    if (line.startsWith("addx")) {
      const [, value] = line.split(" ");
      return {
        type: "addx",
        value: parseInt(value, 10),
      };
    }

    throw new Error(`Unknown instruction: ${line}`);
  });
}
