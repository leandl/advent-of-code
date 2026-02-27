import { isOpen, Point, RunParams } from "./utils";

export function part2Run({ favoriteNumber }: RunParams) {
  const MAX_STEPS = 50;

  const queue: Point[] = [{ x: 1, y: 1, steps: 0 }];
  const visited = new Set<string>(["1,1"]);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let index = 0;

  while (index < queue.length) {
    const current = queue[index++];

    if (current.steps === MAX_STEPS) continue;

    for (const [dx, dy] of directions) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        ny >= 0 &&
        !visited.has(key) &&
        isOpen(favoriteNumber, nx, ny)
      ) {
        visited.add(key);
        queue.push({ x: nx, y: ny, steps: current.steps + 1 });
      }
    }
  }

  return visited.size;
}
