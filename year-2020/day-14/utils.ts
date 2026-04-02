type Address = bigint;
type Value = bigint;

type MaskInstruction = {
  type: "mask";
  raw: string;
};

type MemInstruction = {
  type: "mem";
  address: Address;
  value: Value;
};

export type Instruction = MaskInstruction | MemInstruction;

export function parseProgram(lines: string[]): Instruction[] {
  return lines.map(parseLine);
}

function parseLine(line: string): Instruction {
  if (line.startsWith("mask")) {
    const [, raw] = line.split(" = ");
    return { type: "mask", raw };
  }

  const match = line.match(/^mem\[(\d+)\] = (\d+)$/);
  if (!match) {
    throw new Error(`Invalid line: ${line}`);
  }

  return {
    type: "mem",
    address: BigInt(match[1]),
    value: BigInt(match[2]),
  };
}
