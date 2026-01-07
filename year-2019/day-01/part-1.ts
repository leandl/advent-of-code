import { calculateFuel, parseInputPuzzle } from "./utils";

export function part1Run(lines: string[]) {
  const masses = parseInputPuzzle(lines);
  return masses.reduce((total, mass) => total + calculateFuel(mass), 0);
}
