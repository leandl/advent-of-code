import { evaluate, parseAssignment, regexInstruction, VarValue } from "./utils";

export function part2Run(lines: string[]) {
  const vars = new Map<string, VarValue>();

  for (const line of lines) {
    const match = regexInstruction.exec(line);
    if (match) {
      const [key, value] = parseAssignment(match);
      vars.set(key, value);
    }
  }

  const valueB = evaluate("a", vars);
  const cache = new Map<string, number>([["b", valueB]]);
  return evaluate("a", vars, cache);
}
