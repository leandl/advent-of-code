import { Point } from "./utils";

function getWireSteps(wire: string): Map<Point, number> {
  const stepsMap = new Map<Point, number>();

  let x = 0;
  let y = 0;
  let steps = 0;

  const moves = wire.split(",");

  for (const move of moves) {
    const direction = move[0];
    const distance = parseInt(move.slice(1), 10);

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "R":
          x++;
          break;
        case "L":
          x--;
          break;
        case "U":
          y++;
          break;
        case "D":
          y--;
          break;
      }

      steps++;
      const point: Point = `${x},${y}`;

      // Guarda apenas a primeira vez que o ponto é visitado
      if (!stepsMap.has(point)) {
        stepsMap.set(point, steps);
      }
    }
  }

  return stepsMap;
}

export function part2Run(lines: string[]) {
  const [wire1, wire2] = lines;
  const wire1Steps = getWireSteps(wire1);

  let x = 0;
  let y = 0;
  let steps = 0;
  let minCombinedSteps = Infinity;

  const moves = wire2.split(",");

  for (const move of moves) {
    const direction = move[0];
    const distance = parseInt(move.slice(1), 10);

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "R":
          x++;
          break;
        case "L":
          x--;
          break;
        case "U":
          y++;
          break;
        case "D":
          y--;
          break;
      }

      steps++;
      const point: Point = `${x},${y}`;

      if (wire1Steps.has(point)) {
        const combinedSteps = steps + wire1Steps.get(point)!;
        minCombinedSteps = Math.min(minCombinedSteps, combinedSteps);
      }
    }
  }

  return minCombinedSteps;
}
