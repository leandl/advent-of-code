export type Instruction =
  | { type: "swap_pos"; x: number; y: number }
  | { type: "swap_letter"; x: string; y: string }
  | { type: "rotate_left"; steps: number }
  | { type: "rotate_right"; steps: number }
  | { type: "rotate_pos"; letter: string }
  | { type: "reverse"; x: number; y: number }
  | { type: "move"; x: number; y: number };

export type RunParams = {
  password: string;
  instructions: Instruction[];
};

function parseInstruction(line: string): Instruction {
  let m: RegExpMatchArray | null;

  if ((m = line.match(/^swap position (\d+) with position (\d+)$/))) {
    return { type: "swap_pos", x: Number(m[1]), y: Number(m[2]) };
  }

  if ((m = line.match(/^swap letter ([a-z]) with letter ([a-z])$/))) {
    return { type: "swap_letter", x: m[1], y: m[2] };
  }

  if ((m = line.match(/^rotate left (\d+) step/))) {
    return { type: "rotate_left", steps: Number(m[1]) };
  }

  if ((m = line.match(/^rotate right (\d+) step/))) {
    return { type: "rotate_right", steps: Number(m[1]) };
  }

  if ((m = line.match(/^rotate based on position of letter ([a-z])$/))) {
    return { type: "rotate_pos", letter: m[1] };
  }

  if ((m = line.match(/^reverse positions (\d+) through (\d+)$/))) {
    return { type: "reverse", x: Number(m[1]), y: Number(m[2]) };
  }

  if ((m = line.match(/^move position (\d+) to position (\d+)$/))) {
    return { type: "move", x: Number(m[1]), y: Number(m[2]) };
  }

  throw new Error(`Unknown instruction: ${line}`);
}

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map(parseInstruction);
}
