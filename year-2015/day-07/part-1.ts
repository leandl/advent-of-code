import {
  evaluate,
  Instruction,
  parseAssignment,
  regexInstruction,
  VarValue,
} from "./utils";

export function part1Run(lines: Instruction[]): number {
  const vars = new Map<string, VarValue>();

  for (const line of lines) {
    const match = regexInstruction.exec(line);
    if (match) {
      const [key, value] = parseAssignment(match);
      vars.set(key, value);
    }
  }

  return evaluate("a", vars);
}
