export type Register = "a" | "b" | "c" | "d";

type Arg = Register | number;

export type Instruction =
  | { op: "cpy"; x: Arg; y: Register }
  | { op: "inc"; x: Register }
  | { op: "dec"; x: Register }
  | { op: "jnz"; x: Arg; y: Arg }
  | { op: "out"; x: Arg };

function parseArg(v: string): Arg {
  if (["a", "b", "c", "d"].includes(v)) return v as Register;
  return Number(v);
}

export function parseProgram(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [op, a, b] = line.split(" ");

    switch (op) {
      case "cpy":
        return {
          op: "cpy",
          x: parseArg(a),
          y: b as Register,
        };

      case "inc":
        return {
          op: "inc",
          x: a as Register,
        };

      case "dec":
        return {
          op: "dec",
          x: a as Register,
        };

      case "jnz":
        return {
          op: "jnz",
          x: parseArg(a),
          y: parseArg(b),
        };

      case "out":
        return {
          op: "out",
          x: parseArg(a),
        };

      default:
        throw new Error("Unknown instruction: " + line);
    }
  });
}

export function val(x: Arg, reg: Record<Register, number>): number {
  return typeof x === "number" ? x : reg[x];
}
