export type Register = "a" | "b";

type KeySimpleInstruction = "hlf" | "tpl" | "inc";
type KeyJumperInstruction = "jmp";
type KeyInstructionWithVerification = "jie" | "jio";

// inc a
const regexSimpleInstruction = /(^.*) ([ab]$)/;

function parseSimpleInstruction(
  match: RegExpExecArray
): [KeySimpleInstruction, Register] {
  return [match[1], match[2]] as [KeySimpleInstruction, Register];
}

// jmp +1
const regexJumperInstruction = /(jmp) ([\+\-]\d+$)/;

function parseJumperInstruction(
  match: RegExpExecArray
): [KeyJumperInstruction, number] {
  return [match[1], Number(match[2])] as [KeyJumperInstruction, number];
}

// jio a, +2
const regexInstructionWithVerification = /(^.*) ([ab]), ([\+\-]\d+$)/;

function parseInstructionWithVerification(
  match: RegExpExecArray
): [KeyInstructionWithVerification, Register, number] {
  return [match[1], match[2], Number(match[3])] as [
    KeyInstructionWithVerification,
    Register,
    number
  ];
}

type SimpleInstruction = [KeySimpleInstruction, Register];
type JumperInstruction = [KeyJumperInstruction, number];
type InstructionWithVerification = [
  KeyInstructionWithVerification,
  Register,
  number
];

type Instruction =
  | SimpleInstruction
  | JumperInstruction
  | InstructionWithVerification;

export function parseInstruction(line: string): Instruction | null {
  const matchInstructionWithVerification =
    regexInstructionWithVerification.exec(line);
  if (matchInstructionWithVerification) {
    return parseInstructionWithVerification(matchInstructionWithVerification);
  }

  const matchJumperInstruction = regexJumperInstruction.exec(line);
  if (matchJumperInstruction) {
    return parseJumperInstruction(matchJumperInstruction);
  }

  const matchSimpleInstruction = regexSimpleInstruction.exec(line);
  if (matchSimpleInstruction) {
    return parseSimpleInstruction(matchSimpleInstruction);
  }

  return null;
}

type FunctionExecInstruction = (
  registers: Record<Register, number>,
  instruction: Instruction,
  currentLine: number
) => {
  registers: Record<Register, number>;
  nextLine: number;
};

function executeSimpleInstruction(
  registers: Record<Register, number>,
  instruction: SimpleInstruction,
  currentLine: number
) {
  const [keyInstruction, keyRegister] = instruction;

  if (keyInstruction === "inc") {
    registers[keyRegister] += 1;
  } else if (keyInstruction === "tpl") {
    registers[keyRegister] *= 3;
  } else if (keyInstruction === "hlf") {
    registers[keyRegister] = Math.floor(registers[keyRegister] / 2);
  }

  return {
    registers,
    nextLine: currentLine + 1,
  };
}

function executeJumperInstruction(
  registers: Record<Register, number>,
  instruction: JumperInstruction,
  currentLine: number
) {
  const [_keyInstruction, jumpNumberLines] = instruction;

  return {
    registers,
    nextLine: currentLine + jumpNumberLines,
  };
}

function executeInstructionWithVerification(
  registers: Record<Register, number>,
  instruction: InstructionWithVerification,
  currentLine: number
) {
  const [keyInstruction, keyRegister, jumpNumberLines] = instruction;

  if (
    (keyInstruction === "jie" && registers[keyRegister] % 2 === 0) ||
    (keyInstruction === "jio" && registers[keyRegister] === 1)
  ) {
    return {
      registers,
      nextLine: currentLine + jumpNumberLines,
    };
  }

  return {
    registers,
    nextLine: currentLine + 1,
  };
}

export const instructions: Record<Instruction[0], FunctionExecInstruction> = {
  hlf: (r, i, l) => executeSimpleInstruction(r, i as SimpleInstruction, l),
  tpl: (r, i, l) => executeSimpleInstruction(r, i as SimpleInstruction, l),
  inc: (r, i, l) => executeSimpleInstruction(r, i as SimpleInstruction, l),
  jmp: (r, i, l) => executeJumperInstruction(r, i as JumperInstruction, l),
  jie: (r, i, l) =>
    executeInstructionWithVerification(r, i as InstructionWithVerification, l),
  jio: (r, i, l) =>
    executeInstructionWithVerification(r, i as InstructionWithVerification, l),
};
