export type Registers = [number, number, number, number];
type Instruction = [number, number, number, number];

type Operation = (r: Registers, a: number, b: number, c: number) => void;

export function cloneRegisters(r: Registers): Registers {
  return [r[0], r[1], r[2], r[3]];
}

// 16 opcodes
export const operations: Record<string, Operation> = {
  addr: (r, a, b, c) => (r[c] = r[a] + r[b]),
  addi: (r, a, b, c) => (r[c] = r[a] + b),

  mulr: (r, a, b, c) => (r[c] = r[a] * r[b]),
  muli: (r, a, b, c) => (r[c] = r[a] * b),

  banr: (r, a, b, c) => (r[c] = r[a] & r[b]),
  bani: (r, a, b, c) => (r[c] = r[a] & b),

  borr: (r, a, b, c) => (r[c] = r[a] | r[b]),
  bori: (r, a, b, c) => (r[c] = r[a] | b),

  setr: (r, a, _b, c) => (r[c] = r[a]),
  seti: (r, a, _b, c) => (r[c] = a),

  gtir: (r, a, b, c) => (r[c] = a > r[b] ? 1 : 0),
  gtri: (r, a, b, c) => (r[c] = r[a] > b ? 1 : 0),
  gtrr: (r, a, b, c) => (r[c] = r[a] > r[b] ? 1 : 0),

  eqir: (r, a, b, c) => (r[c] = a === r[b] ? 1 : 0),
  eqri: (r, a, b, c) => (r[c] = r[a] === b ? 1 : 0),
  eqrr: (r, a, b, c) => (r[c] = r[a] === r[b] ? 1 : 0),
};

export function equalRegisters(a: Registers, b: Registers): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

type Sample = {
  before: Registers;
  instruction: Instruction;
  after: Registers;
};

function parseSamples(lines: string[]): Sample[] {
  const samples = new Array<Sample>();

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith("Before")) continue;

    const before = lines[i].match(/\d+/g)!.map(Number) as Registers;

    const instruction = lines[i + 1].split(" ").map(Number) as Instruction;

    const after = lines[i + 2].match(/\d+/g)!.map(Number) as Registers;

    samples.push({ before, instruction, after });

    i += 2;
  }

  return samples;
}

function parseProgram(lines: string[]): Instruction[] {
  return lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split(" ").map(Number) as Instruction);
}

export type ChronalProgramInput = {
  samples: Sample[];
  program: Instruction[];
};

export function parseChronalProgramInput(lines: string[]): ChronalProgramInput {
  let splitIndex = 0;

  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] === "" && lines[i + 1] === "") {
      splitIndex = i;
      break;
    }
  }

  const sampleLines = lines.slice(0, splitIndex);
  const programLines = lines.slice(splitIndex + 2);

  return {
    samples: parseSamples(sampleLines),
    program: parseProgram(programLines),
  };
}
