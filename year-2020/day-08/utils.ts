type Operation = "acc" | "jmp" | "nop";

export type Instruction = {
  op: Operation;
  arg: number;
};

export function parseProgram(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [op, arg] = line.split(" ");
    return {
      op: op as Operation,
      arg: Number(arg),
    };
  });
}
