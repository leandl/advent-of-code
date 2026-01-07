export function parseInputPuzzle(lines: string[]): number[] {
  return lines.map((line) => Number(line));
}

export function calculateFuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function calculateTotalFuelForModule(mass: number): number {
  let totalFuel = 0;
  let fuel = calculateFuel(mass);

  while (fuel > 0) {
    totalFuel += fuel;
    fuel = calculateFuel(fuel);
  }

  return totalFuel;
}
