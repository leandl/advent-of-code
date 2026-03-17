type Literal = {
  kind: "LITERAL";
  value: number;
};

type Register = {
  kind: "REGISTER";
  name: string;
};

type Value = Literal | Register;

type SetInstruction = {
  op: "set";
  x: Register;
  y: Value;
};

type SubInstruction = {
  op: "sub";
  x: Register;
  y: Value;
};

type MulInstruction = {
  op: "mul";
  x: Register;
  y: Value;
};

type JnzInstruction = {
  op: "jnz";
  x: Value;
  y: Value;
};

export type Instruction =
  | SetInstruction
  | SubInstruction
  | MulInstruction
  | JnzInstruction;

export type Registers = Record<string, number>;

function isNumber(token: string): boolean {
  return /^-?\d+$/.test(token);
}

function parseRegister(token: string): Register {
  return {
    kind: "REGISTER",
    name: token,
  };
}

function parseValue(token: string): Value {
  if (isNumber(token)) {
    return {
      kind: "LITERAL",
      value: parseInt(token, 10),
    };
  }

  return parseRegister(token);
}

export function setRegister(registers: Registers, r: Register, value: number) {
  registers[r.name] = value;
}

function getRegister(registers: Registers, r: Register): number {
  return registers[r.name] ?? 0;
}

export function getValue(registers: Registers, v: Value) {
  if (v.kind === "LITERAL") {
    return v.value;
  }

  return getRegister(registers, v);
}

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [op, x, y] = line.trim().split(/\s+/);

    switch (op) {
      case "set":
      case "sub":
      case "mul":
        return {
          op,
          x: parseRegister(x),
          y: parseValue(y),
        };

      case "jnz":
        return {
          op,
          x: parseValue(x),
          y: parseValue(y),
        };

      default:
        throw new Error(`Unknown instruction: ${op}`);
    }
  });
}
