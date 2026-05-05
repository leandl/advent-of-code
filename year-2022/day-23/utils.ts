type Pos = { x: number; y: number };

const dirs = [
  {
    name: "N",
    checks: [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ],
    move: { x: 0, y: -1 },
  },
  {
    name: "S",
    checks: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ],
    move: { x: 0, y: 1 },
  },
  {
    name: "W",
    checks: [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ],
    move: { x: -1, y: 0 },
  },
  {
    name: "E",
    checks: [
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ],
    move: { x: 1, y: 0 },
  },
];

const neighbors = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

function key(p: Pos): string {
  return `${p.x},${p.y}`;
}

export function parseElfPositions(lines: string[]): Set<string> {
  const elves = new Set<string>();

  lines.forEach((line, y) => {
    line.split("").forEach((c, x) => {
      if (c === "#") elves.add(key({ x, y }));
    });
  });

  return elves;
}

export function simulate(elves: Set<string>, rounds: number): number {
  let dirOrder = [...dirs];

  for (let r = 0; r < rounds; r++) {
    const proposals = new Map<string, string[]>(); // target -> sources

    for (const e of elves) {
      const [x, y] = e.split(",").map(Number);

      // check neighbors
      const hasNeighbor = neighbors.some((d) =>
        elves.has(key({ x: x + d.x, y: y + d.y })),
      );

      if (!hasNeighbor) continue;

      for (const dir of dirOrder) {
        const free = dir.checks.every(
          (d) => !elves.has(key({ x: x + d.x, y: y + d.y })),
        );

        if (free) {
          const target = key({ x: x + dir.move.x, y: y + dir.move.y });
          if (!proposals.has(target)) proposals.set(target, []);
          proposals.get(target)!.push(e);
          break;
        }
      }
    }

    const newElves = new Set(elves);

    for (const [target, sources] of proposals.entries()) {
      if (sources.length === 1) {
        newElves.delete(sources[0]);
        newElves.add(target);
      }
    }

    elves = newElves;

    // rotate directions
    dirOrder.push(dirOrder.shift()!);
  }

  // bounding box
  const coords = [...elves].map((e) => e.split(",").map(Number));
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const area = (maxX - minX + 1) * (maxY - minY + 1);

  return area - elves.size;
}

export function findFirstStableRound(elves: Set<string>): number {
  let dirOrder = [...dirs];
  let round = 0;

  while (true) {
    round++;

    const proposals = new Map<string, string[]>();
    let moved = false;

    for (const e of elves) {
      const [x, y] = e.split(",").map(Number);

      const hasNeighbor = neighbors.some((d) =>
        elves.has(key({ x: x + d.x, y: y + d.y })),
      );

      if (!hasNeighbor) continue;

      for (const dir of dirOrder) {
        const free = dir.checks.every(
          (d) => !elves.has(key({ x: x + d.x, y: y + d.y })),
        );

        if (free) {
          const target = key({ x: x + dir.move.x, y: y + dir.move.y });

          if (!proposals.has(target)) proposals.set(target, []);
          proposals.get(target)!.push(e);
          break;
        }
      }
    }

    const newElves = new Set(elves);

    for (const [target, sources] of proposals.entries()) {
      if (sources.length === 1) {
        newElves.delete(sources[0]);
        newElves.add(target);
        moved = true;
      }
    }

    elves = newElves;

    // rotaciona direções
    dirOrder.push(dirOrder.shift()!);

    if (!moved) {
      return round;
    }
  }
}
