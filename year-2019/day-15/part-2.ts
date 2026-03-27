import { IntcodeComputer } from "../../utils/intcode-computer";
import { Direction, DIRS, key, OPPOSITE, Position } from "./utils";

const ALL_DIRS: Direction[] = [
  Direction.NORTH,
  Direction.SOUTH,
  Direction.WEST,
  Direction.EAST,
];

export function part2Run(program: number[]): number {
  const computer = new IntcodeComputer(program);

  const map = new Map<string, number>(); // 0 wall, 1 empty, 2 oxygen
  let oxygen: Position | null = null;

  let inputQueue: number[] = [];

  const io = {
    input: () => inputQueue.shift()!,
    output: (_: number) => {},
  };

  function move(dir: Direction): number {
    inputQueue.push(dir);
    const res = computer.runUntilOutput(io);
    if (res === null) throw new Error("Program halted unexpectedly");
    return res;
  }

  function dfs(pos: Position) {
    for (const dir of ALL_DIRS) {
      const { dx, dy } = DIRS[dir];
      const next: Position = { x: pos.x + dx, y: pos.y + dy };

      const k = key(next.x, next.y);
      if (map.has(k)) continue;

      const status = move(dir);
      map.set(k, status);

      if (status === 0) continue;

      if (status === 2) {
        oxygen = next;
      }

      dfs(next);

      // backtrack
      move(OPPOSITE[dir]);
    }
  }

  const start: Position = { x: 0, y: 0 };
  map.set(key(0, 0), 1);

  dfs(start);

  if (!oxygen) throw new Error("Oxygen not found");

  const queue: [Position, number][] = [[oxygen, 0]];
  const visited = new Set<string>();

  let maxMinutes = 0;

  while (queue.length) {
    const [pos, minutes] = queue.shift()!;
    const k = key(pos.x, pos.y);

    if (visited.has(k)) continue;
    visited.add(k);

    maxMinutes = Math.max(maxMinutes, minutes);

    for (const dir of ALL_DIRS) {
      const { dx, dy } = DIRS[dir];
      const next: Position = { x: pos.x + dx, y: pos.y + dy };

      const nk = key(next.x, next.y);
      const tile = map.get(nk);

      if (tile === undefined || tile === 0) continue;

      queue.push([next, minutes + 1]);
    }
  }

  return maxMinutes;
}
