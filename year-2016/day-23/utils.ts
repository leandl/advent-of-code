export type Register = "a" | "b" | "c" | "d";

export type Instruction =
  | { op: "cpy"; x: string; y: string }
  | { op: "inc"; x: string }
  | { op: "dec"; x: string }
  | { op: "jnz"; x: string; y: string }
  | { op: "tgl"; x: string };

export function isRegister(v: string): v is Register {
  return ["a", "b", "c", "d"].includes(v);
}

export function val(x: string, reg: Record<Register, number>) {
  return isRegister(x) ? reg[x] : parseInt(x);
}

export function toggle(inst: Instruction): Instruction {
  switch (inst.op) {
    case "inc":
      return { op: "dec", x: inst.x };

    case "dec":
    case "tgl":
      return { op: "inc", x: inst.x };

    case "jnz":
      return { op: "cpy", x: inst.x, y: inst.y };

    case "cpy":
      return { op: "jnz", x: inst.x, y: inst.y };
  }
}

export function parseInstructions(program: string[]): Instruction[] {
  return program.map((line) => {
    const [op, a, b] = line.split(" ");

    switch (op) {
      case "cpy":
        return { op, x: a, y: b };
      case "inc":
      case "dec":
      case "tgl":
        return { op, x: a };
      case "jnz":
        return { op, x: a, y: b };
      default:
        throw new Error("unknown instruction");
    }
  });
}
