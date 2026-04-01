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
  // 0 = wall, 1 = empty, 2 = oxygen

  let oxygen: Position | null = null;

  let inputQueue: number[] = [];

  const io = {
    input: () => inputQueue.shift()!,
  };

  function move(dir: Direction): number {
    inputQueue.push(dir);
    const res = computer.runUntilOutput(io.input);
    if (res === null) throw new Error("Program halted unexpectedly");
    return res;
  }

  function dfs(pos: Position) {
    for (const dir of Object.values(Direction).filter(
      (v) => typeof v === "number",
    ) as Direction[]) {
      const { dx, dy } = DIRS[dir];
      const next: Position = { x: pos.x + dx, y: pos.y + dy };

      const k = key(next.x, next.y);
      if (map.has(k)) continue;

      const status = move(dir);
      map.set(k, status);

      if (status === 0) continue; // wall

      if (status === 2) {
        oxygen = next;
      }

      dfs(next);

      move(OPPOSITE[dir]);
    }
  }

  const start: Position = { x: 0, y: 0 };
  map.set(key(0, 0), 1);

  dfs(start);

  if (!oxygen) throw new Error("Oxygen not found");

  return bfs(map, start, oxygen);
}
