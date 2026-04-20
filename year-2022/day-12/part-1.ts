import { HeightMap, bfs } from "./utils";

export function part1Run({ elevations, end, start }: HeightMap) {
  return bfs(
    elevations,
    [start],
    (current, next) => next <= current + 1,
    (x, y) => x === end.x && y === end.y,
  );
}
