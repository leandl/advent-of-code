import { bfs, HeightMap } from "./utils";

export function part2Run({ elevations, end, start }: HeightMap) {
  return bfs(
    elevations,
    [end],
    (current, next) => next >= current - 1,
    (_, __, elevation) => elevation === 0,
  );
}
