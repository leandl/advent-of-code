type Point = { x: number; y: number; z: number };

export type Brick = {
  id: number;
  from: Point;
  to: Point;
  cells: Point[];
};

export function parseBricks(lines: string[]): Brick[] {
  return lines.map((line, i) => {
    const [a, b] = line.split("~");
    const [x1, y1, z1] = a.split(",").map(Number);
    const [x2, y2, z2] = b.split(",").map(Number);

    const from = {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      z: Math.min(z1, z2),
    };

    const to = {
      x: Math.max(x1, x2),
      y: Math.max(y1, y2),
      z: Math.max(z1, z2),
    };

    const cells: Point[] = [];

    for (let x = from.x; x <= to.x; x++) {
      for (let y = from.y; y <= to.y; y++) {
        for (let z = from.z; z <= to.z; z++) {
          cells.push({ x, y, z });
        }
      }
    }

    return { id: i, from, to, cells };
  });
}

function fall(bricks: Brick[]): Map<string, number> {
  // ordena por menor z primeiro
  bricks.sort((a, b) => a.from.z - b.from.z);

  const grid = new Map<string, number>(); // "x,y,z" -> brickId

  function key(x: number, y: number, z: number) {
    return `${x},${y},${z}`;
  }

  for (const brick of bricks) {
    let dz = 0;

    while (true) {
      const canFall = brick.cells.every(({ x, y, z }) => {
        const nz = z - (dz + 1);
        if (nz < 1) return false;
        return !grid.has(key(x, y, nz));
      });

      if (!canFall) break;
      dz++;
    }

    // aplica queda
    brick.cells = brick.cells.map(({ x, y, z }) => ({
      x,
      y,
      z: z - dz,
    }));

    // atualiza bounds
    brick.from.z -= dz;
    brick.to.z -= dz;

    // ocupa grid
    for (const c of brick.cells) {
      grid.set(key(c.x, c.y, c.z), brick.id);
    }
  }

  return grid;
}

function buildGraph(bricks: Brick[], grid: Map<string, number>) {
  const supports = new Map<number, Set<number>>();
  const supportedBy = new Map<number, Set<number>>();

  function key(x: number, y: number, z: number) {
    return `${x},${y},${z}`;
  }

  for (const brick of bricks) {
    supports.set(brick.id, new Set());
    supportedBy.set(brick.id, new Set());
  }

  for (const brick of bricks) {
    for (const { x, y, z } of brick.cells) {
      const above = grid.get(key(x, y, z + 1));
      if (above !== undefined && above !== brick.id) {
        supports.get(brick.id)!.add(above);
        supportedBy.get(above)!.add(brick.id);
      }
    }
  }

  return { supports, supportedBy };
}

export function countSafe(bricks: Brick[]) {
  const grid = fall(bricks);
  const { supports, supportedBy } = buildGraph(bricks, grid);

  let safe = 0;

  for (const brick of bricks) {
    let ok = true;

    for (const above of supports.get(brick.id)!) {
      if (supportedBy.get(above)!.size === 1) {
        ok = false;
        break;
      }
    }

    if (ok) safe++;
  }

  return safe;
}

export function countChainReactions(bricks: Brick[]) {
  const grid = fall(bricks);
  const { supports, supportedBy } = buildGraph(bricks, grid);

  let total = 0;

  for (const start of bricks) {
    const falling = new Set<number>();
    const queue: number[] = [];

    // começa removendo o brick inicial
    falling.add(start.id);
    queue.push(start.id);

    while (queue.length > 0) {
      const current = queue.shift()!;

      for (const above of supports.get(current)!) {
        if (falling.has(above)) continue;

        const supporters = supportedBy.get(above)!;

        // verifica se TODOS os suportes já caíram
        const allGone = [...supporters].every((s) => falling.has(s));

        if (allGone) {
          falling.add(above);
          queue.push(above);
        }
      }
    }

    // não conta o próprio brick inicial
    total += falling.size - 1;
  }

  return total;
}
