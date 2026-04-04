import { Grid } from "../../utils/parsers";

type KeyCoord4D = `${number},${number},${number},${number}`;
type Coord4D = [number, number, number, number];

function key4D(x: number, y: number, z: number, w: number): KeyCoord4D {
  return `${x},${y},${z},${w}`;
}

function parseKey4D(k: KeyCoord4D): Coord4D {
  return k.split(",").map(Number) as Coord4D;
}

function getNeighbors4D(x: number, y: number, z: number, w: number): Coord4D[] {
  const neighbors: Coord4D[] = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;
          neighbors.push([x + dx, y + dy, z + dz, w + dw]);
        }
      }
    }
  }

  return neighbors;
}

export function part2Run(grid: Grid<string>) {
  let active = new Set<KeyCoord4D>();

  // Inicializar (z=0, w=0)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        active.add(key4D(x, y, 0, 0));
      }
    }
  }

  // 6 ciclos
  for (let cycle = 0; cycle < 6; cycle++) {
    const neighborCount = new Map<KeyCoord4D, number>();

    // Contar vizinhos
    for (const k of active) {
      const [x, y, z, w] = parseKey4D(k);

      for (const [nx, ny, nz, nw] of getNeighbors4D(x, y, z, w)) {
        const nk = key4D(nx, ny, nz, nw);
        neighborCount.set(nk, (neighborCount.get(nk) || 0) + 1);
      }
    }

    const next = new Set<KeyCoord4D>();

    for (const [k, count] of neighborCount.entries()) {
      const isActive = active.has(k);

      if (
        (isActive && (count === 2 || count === 3)) ||
        (!isActive && count === 3)
      ) {
        next.add(k);
      }
    }

    active = next;
  }

  return active.size;
}
