import { parseInputPuzzle, Reveal } from "./utils";

type CubeCounts = {
  red: number;
  green: number;
  blue: number;
};

function getMinimumCubes(reveals: Reveal[]): CubeCounts {
  const minimum: CubeCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const reveal of reveals) {
    for (const [count, color] of reveal) {
      if (count > minimum[color as keyof CubeCounts]) {
        minimum[color as keyof CubeCounts] = count;
      }
    }
  }

  return minimum;
}

function calculatePower(cubes: CubeCounts): number {
  return cubes.red * cubes.green * cubes.blue;
}

export function part2Run(lines: string[]) {
  const games = parseInputPuzzle(lines);

  let sum = 0;
  for (const [_, reveals] of games) {
    const minimumCubes = getMinimumCubes(reveals);
    const power = calculatePower(minimumCubes);
    sum += power;
  }

  return sum;
}
