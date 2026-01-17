import { Point } from "./utils";

export function manhattanDistance(x: number, y: number): number {
  return Math.abs(x) + Math.abs(y);
}

function getWirePath(wire: string): Set<Point> {
  const visited = new Set<Point>();

  let x = 0;
  let y = 0;

  const moves = wire.split(",");

  for (const move of moves) {
    const direction = move[0];
    const steps = parseInt(move.slice(1), 10);

    for (let i = 0; i < steps; i++) {
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
      visited.add(`${x},${y}`);
    }
  }

  return visited;
}

export function part1Run(lines: string[]) {
  const [wire1, wire2] = lines;
  const path1 = getWirePath(wire1);

  let x = 0;
  let y = 0;
  let minDistance = Infinity;

  const moves = wire2.split(",");

  for (const move of moves) {
    const direction = move[0];
    const steps = parseInt(move.slice(1), 10);

    for (let i = 0; i < steps; i++) {
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

      const point: Point = `${x},${y}`;

      if (path1.has(point)) {
        const distance = manhattanDistance(x, y);
        minDistance = Math.min(minDistance, distance);
      }
    }
  }

  return minDistance;
}
