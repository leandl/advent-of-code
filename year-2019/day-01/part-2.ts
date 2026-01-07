import { parseInputPuzzle, calculateTotalFuelForModule } from "./utils";

export function part2Run(lines: string[]) {
  const masses = parseInputPuzzle(lines);
  return masses.reduce(
    (total, mass) => total + calculateTotalFuelForModule(mass),
    0
  );
}
