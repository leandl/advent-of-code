type Point3D = [number, number, number];

function key(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function parseKey(k: string): Point3D {
  return k.split(",").map(Number) as Point3D;
}

export function parseCubes(lines: string[]): Set<string> {
  const cubes = new Set<string>();

  for (const line of lines) {
    if (!line) continue;

    const [x, y, z] = line.split(",").map(Number);
    cubes.add(key(x, y, z));
  }

  return cubes;
}

export function surfaceArea(cubes: Set<string>): number {
  const directions: Point3D[] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  let area = 0;

  for (const cube of cubes) {
    const [x, y, z] = parseKey(cube);

    for (const [dx, dy, dz] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;

      if (!cubes.has(key(nx, ny, nz))) {
        area++;
      }
    }
  }

  return area;
}

export function exteriorSurfaceArea(cubes: Set<string>): number {
  const directions: Point3D[] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;

  for (const cube of cubes) {
    const [x, y, z] = parseKey(cube);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }

  // expandir 1 pra garantir borda externa
  minX--;
  minY--;
  minZ--;
  maxX++;
  maxY++;
  maxZ++;

  const visited = new Set<string>();
  const queue: Point3D[] = [[minX, minY, minZ]];

  let area = 0;

  while (queue.length > 0) {
    const [x, y, z] = queue.shift()!;
    const k = key(x, y, z);

    if (visited.has(k)) continue;
    visited.add(k);

    for (const [dx, dy, dz] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;

      // fora da bounding box
      if (
        nx < minX ||
        nx > maxX ||
        ny < minY ||
        ny > maxY ||
        nz < minZ ||
        nz > maxZ
      ) {
        continue;
      }

      const nk = key(nx, ny, nz);

      if (cubes.has(nk)) {
        // encostou na lava → face externa
        area++;
      } else {
        // ar → continua BFS
        if (!visited.has(nk)) {
          queue.push([nx, ny, nz]);
        }
      }
    }
  }

  return area;
}
