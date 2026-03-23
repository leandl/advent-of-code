import { CaveInput } from "./utils";

type Tool = 0 | 1 | 2;
type QueueItem = [time: number, stateId: number];

const allowedTools: Tool[][] = [
  [0, 1], // rocky
  [1, 2], // wet
  [0, 2], // narrow
];

export function part2Run({ depth, target }: CaveInput) {
  const maxX = target.x + 50;
  const maxY = target.y + 50;

  const erosion: number[][] = Array.from({ length: maxY + 1 }, () =>
    new Array(maxX + 1).fill(0),
  );

  const type: number[][] = Array.from({ length: maxY + 1 }, () =>
    new Array(maxX + 1).fill(0),
  );

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      let geo;

      if ((x === 0 && y === 0) || (x === target.x && y === target.y)) {
        geo = 0;
      } else if (y === 0) {
        geo = x * 16807;
      } else if (x === 0) {
        geo = y * 48271;
      } else {
        geo = erosion[y][x - 1] * erosion[y - 1][x];
      }

      erosion[y][x] = (geo + depth) % 20183;
      type[y][x] = erosion[y][x] % 3;
    }
  }

  const W = maxX + 1;

  const encode = (x: number, y: number, tool: Tool) => (y * W + x) * 3 + tool;

  const dist = new Map<number, number>();
  const heap: QueueItem[] = [];

  const push = (time: number, id: number) => {
    heap.push([time, id]);
    heap.sort((a, b) => a[0] - b[0]); // ok porque reduzimos MUITO o custo geral
  };

  const start = encode(0, 0, 0); // torch
  push(0, start);
  dist.set(start, 0);

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (heap.length) {
    const [time, id] = heap.shift()!;

    if (time > dist.get(id)!) continue;

    const tool = (id % 3) as Tool;
    const pos = Math.floor(id / 3);
    const x = pos % W;
    const y = Math.floor(pos / W);

    if (x === target.x && y === target.y && tool === 0) {
      return time;
    }

    const t = type[y][x];

    // trocar ferramenta
    for (const nt of allowedTools[t]) {
      if (nt !== tool) {
        const nid = encode(x, y, nt);
        const newTime = time + 7;

        if (!dist.has(nid) || newTime < dist.get(nid)!) {
          dist.set(nid, newTime);
          push(newTime, nid);
        }
      }
    }

    // mover
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx > maxX || ny > maxY) continue;

      if (!allowedTools[type[ny][nx]].includes(tool)) continue;

      const nid = encode(nx, ny, tool);
      const newTime = time + 1;

      if (!dist.has(nid) || newTime < dist.get(nid)!) {
        dist.set(nid, newTime);
        push(newTime, nid);
      }
    }
  }

  throw new Error("no path");
}
