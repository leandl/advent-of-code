export type Operand =
  | { type: "reg"; value: string }
  | { type: "num"; value: number };

export type Instruction =
  | { op: "snd"; x: Operand }
  | { op: "set" | "add" | "mul" | "mod"; x: string; y: Operand }
  | { op: "rcv"; x: Operand }
  | { op: "jgz"; x: Operand; y: Operand };

function parseOperand(token: string): Operand {
  const n = Number(token);
  if (!Number.isNaN(n)) {
    return { type: "num", value: n };
  }
  return { type: "reg", value: token };
}

export function parseProgram(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [op, a, b] = line.split(" ");

    switch (op) {
      case "snd":
        return { op, x: parseOperand(a) };

      case "set":
      case "add":
      case "mul":
      case "mod":
        return { op, x: a, y: parseOperand(b) };

      case "rcv":
        return { op, x: parseOperand(a) };

      case "jgz":
        return { op, x: parseOperand(a), y: parseOperand(b) };

      default:
        throw new Error(`Unknown op ${op}`);
    }
  });
}
