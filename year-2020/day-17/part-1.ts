import { Grid } from "../../utils/parsers";

type KeyCoord = `${number},${number},${number}`;
type Coord = [number, number, number];

function key(x: number, y: number, z: number): KeyCoord {
  return `${x},${y},${z}`;
}

function parseKey(k: KeyCoord): Coord {
  return k.split(",").map(Number) as Coord;
}

function getNeighbors(x: number, y: number, z: number): Coord[] {
  const neighbors: Coord[] = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        neighbors.push([x + dx, y + dy, z + dz]);
      }
    }
  }

  return neighbors;
}

export function part1Run(grid: Grid<string>) {
  let active = new Set<KeyCoord>();

  // Inicializar (z = 0)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        active.add(key(x, y, 0));
      }
    }
  }

  // 6 ciclos
  for (let cycle = 0; cycle < 6; cycle++) {
    const neighborCount = new Map<KeyCoord, number>();

    // Contar vizinhos
    for (const k of active) {
      const [x, y, z] = parseKey(k);

      for (const [nx, ny, nz] of getNeighbors(x, y, z)) {
        const nk = key(nx, ny, nz);
        neighborCount.set(nk, (neighborCount.get(nk) || 0) + 1);
      }
    }

    const next = new Set<KeyCoord>();

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
