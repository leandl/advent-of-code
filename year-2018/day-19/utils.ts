export type Registers = [number, number, number, number, number, number];

type OpCode =
  | "addr"
  | "addi"
  | "mulr"
  | "muli"
  | "banr"
  | "bani"
  | "borr"
  | "bori"
  | "setr"
  | "seti"
  | "gtir"
  | "gtri"
  | "gtrr"
  | "eqir"
  | "eqri"
  | "eqrr";

type Instruction = {
  op: OpCode;
  a: number;
  b: number;
  c: number;
};

export const ops: Record<
  string,
  (r: Registers, a: number, b: number, c: number) => void
> = {
  addr: (r, a, b, c) => (r[c] = r[a] + r[b]),
  addi: (r, a, b, c) => (r[c] = r[a] + b),

  mulr: (r, a, b, c) => (r[c] = r[a] * r[b]),
  muli: (r, a, b, c) => (r[c] = r[a] * b),

  banr: (r, a, b, c) => (r[c] = r[a] & r[b]),
  bani: (r, a, b, c) => (r[c] = r[a] & b),

  borr: (r, a, b, c) => (r[c] = r[a] | r[b]),
  bori: (r, a, b, c) => (r[c] = r[a] | b),

  setr: (r, a, _b, c) => (r[c] = r[a]),
  seti: (_r, a, _b, c) => (_r[c] = a),

  gtir: (r, a, b, c) => (r[c] = a > r[b] ? 1 : 0),
  gtri: (r, a, b, c) => (r[c] = r[a] > b ? 1 : 0),
  gtrr: (r, a, b, c) => (r[c] = r[a] > r[b] ? 1 : 0),

  eqir: (r, a, b, c) => (r[c] = a === r[b] ? 1 : 0),
  eqri: (r, a, b, c) => (r[c] = r[a] === b ? 1 : 0),
  eqrr: (r, a, b, c) => (r[c] = r[a] === r[b] ? 1 : 0),
};

export type BoundProgram = {
  ipRegister: number;
  instructions: Instruction[];
};

export function parseBoundProgram(lines: string[]): BoundProgram {
  const [, ipRaw] = lines[0].split(" ");
  const ipRegister = Number(ipRaw);

  const instructions: Instruction[] = lines.slice(1).map((line) => {
    const [op, a, b, c] = line.split(" ");

    if (!isOpCode(op)) {
      throw new Error(`Invalid opcode: ${op}`);
    }

    return {
      op,
      a: Number(a),
      b: Number(b),
      c: Number(c),
    };
  });

  return { ipRegister, instructions };
}

export function isOpCode(value: string): value is OpCode {
  return value in ops;
}
