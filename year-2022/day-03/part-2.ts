import { getPriority } from "./utils";

export function part2Run(lines: string[]) {
  let sum = 0;

  for (let i = 0; i < lines.length; i += 3) {
    const a = lines[i];
    const b = lines[i + 1];
    const c = lines[i + 2];

    const setA = new Set(a);
    const setB = new Set(b);

    for (const char of setA) {
      if (setB.has(char) && c.includes(char)) {
        sum += getPriority(char);
        break;
      }
    }
  }

  return sum;
}
