type Point = [number, number];

const WIDTH = 7;

const ROCKS: Point[][] = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

function key(x: number, y: number) {
  return `${x},${y}`;
}

function canMove(
  rock: Point[],
  dx: number,
  dy: number,
  occupied: Set<string>,
): boolean {
  return rock.every(([x, y]) => {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= WIDTH) return false;
    if (ny < 0) return false;

    return !occupied.has(key(nx, ny));
  });
}

function move(rock: Point[], dx: number, dy: number): Point[] {
  return rock.map(([x, y]) => [x + dx, y + dy]);
}

function getProfile(occupied: Set<string>): string {
  const heights = Array(WIDTH).fill(-1);

  for (const cell of occupied) {
    const [xStr, yStr] = cell.split(",");
    const x = Number(xStr);
    const y = Number(yStr);
    heights[x] = Math.max(heights[x], y);
  }

  const max = Math.max(...heights);
  return heights.map((h) => max - h).join(",");
}

export function simulate(jets: string, totalRocks: number): number {
  const occupied = new Set<string>();

  let jetIndex = 0;
  let highestY = -1;

  const seen = new Map<string, [number, number]>();
  let addedHeight = 0;

  let i = 0;

  while (i < totalRocks) {
    const shape = ROCKS[i % ROCKS.length];
    let rock: Point[] = shape.map(([x, y]) => [x + 2, y + highestY + 4]);

    while (true) {
      const jet = jets[jetIndex % jets.length];
      jetIndex++;

      const dx = jet === "<" ? -1 : 1;

      if (canMove(rock, dx, 0, occupied)) {
        rock = move(rock, dx, 0);
      }

      if (canMove(rock, 0, -1, occupied)) {
        rock = move(rock, 0, -1);
      } else {
        for (const [x, y] of rock) {
          occupied.add(key(x, y));
          highestY = Math.max(highestY, y);
        }
        break;
      }
    }

    const stateKey = [
      i % ROCKS.length,
      jetIndex % jets.length,
      getProfile(occupied),
    ].join("|");

    if (seen.has(stateKey)) {
      const [prevI, prevHeight] = seen.get(stateKey)!;

      const cycleLen = i - prevI;
      const cycleHeight = highestY - prevHeight;

      const remaining = totalRocks - i - 1;
      const cycles = Math.floor(remaining / cycleLen);

      if (cycles > 0) {
        i += cycles * cycleLen;
        addedHeight += cycles * cycleHeight;
      }
    } else {
      seen.set(stateKey, [i, highestY]);
    }

    i++;
  }

  return highestY + 1 + addedHeight;
}
