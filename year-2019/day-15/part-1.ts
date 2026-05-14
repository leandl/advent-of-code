import { IntcodeComputer } from "../../utils/intcode-computer";
import { Direction, DIRS, key, OPPOSITE, Position } from "./utils";

function bfs(
  map: Map<string, number>,
  start: Position,
  target: Position,
): number {
  const queue: [Position, number][] = [[start, 0]];
  const visited = new Set<string>();

  while (queue.length) {
    const [pos, dist] = queue.shift()!;
    const k = key(pos.x, pos.y);

    if (visited.has(k)) continue;
    visited.add(k);

    if (pos.x === target.x && pos.y === target.y) {
      return dist;
    }

    for (const dir of Object.values(Direction).filter(
      (v) => typeof v === "number",
    ) as Direction[]) {
      const { dx, dy } = DIRS[dir];
      const next: Position = { x: pos.x + dx, y: pos.y + dy };

      const nk = key(next.x, next.y);
      const tile = map.get(nk);

      if (tile === undefined || tile === 0) continue;

      queue.push([next, dist + 1]);
    }
  }

  return -1;
}

export function part1Run(program: number[]): number {
  const computer = new IntcodeComputer(program);

  const map = new Map<string, number>();
  let oxygen: Position | null = null;

  let x = 0;
  let y = 0;

  const start: Position = { x: 0, y: 0 };
  map.set(key(0, 0), 1);

  function runMove(dir: Direction): number {
    computer.io.provideInput(dir);

    while (true) {
      const res = computer.run();

      if (res.type === "output") {
        return res.value;
      }

      if (res.type === "need_input") {
        continue;
      }

      if (res.type === "halt") {
        throw new Error("Program halted unexpectedly");
      }
    }
  }

  function dfs(pos: Position) {
    for (const dir of Object.values(Direction).filter(
      (v) => typeof v === "number",
    ) as Direction[]) {
      const { dx, dy } = DIRS[dir];
      const next: Position = { x: pos.x + dx, y: pos.y + dy };

      const k = key(next.x, next.y);
      if (map.has(k)) continue;

      const status = runMove(dir);
      map.set(k, status);

      if (status === 0) continue;

      if (status === 2) {
        oxygen = next;
      }

      x = next.x;
      y = next.y;

      dfs(next);

      runMove(OPPOSITE[dir]);

      x = pos.x;
      y = pos.y;
    }
  }

  dfs(start);

  if (!oxygen) throw new Error("Oxygen not found");

  return bfs(map, start, oxygen);
}
