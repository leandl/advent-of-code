import { getPriority } from "./utils";

export function part1Run(lines: string[]) {
  let sum = 0;

  for (const line of lines) {
    const mid = line.length / 2;
    const firstCompartment = line.slice(0, mid);
    const secondCompartment = line.slice(mid);

    const set1 = new Set(firstCompartment);

    // encontrar o único item em comum
    for (const char of secondCompartment) {
      if (set1.has(char)) {
        sum += getPriority(char);
        break;
      }
    }
  }

  return sum;
}
