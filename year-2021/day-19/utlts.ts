export type Point = [number, number, number];

export type Scanner = {
  beacons: Point[];
};

export function parseScanners(input: string): Scanner[] {
  const blocks = input.trim().split(/\n\s*\n/); // separa scanners

  return blocks.map((block) => {
    const lines = block.split("\n").map((l) => l.trim());

    // ignora linha "--- scanner X ---"
    const beacons: Point[] = [];

    for (const line of lines) {
      if (!line || line.startsWith("---")) continue;

      const [x, y, z] = line.split(",").map(Number);
      beacons.push([x, y, z]);
    }

    return { beacons };
  });
}

// Soma e subtração de pontos
const add = (a: Point, b: Point): Point => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
const sub = (a: Point, b: Point): Point => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
const eq = (a: Point, b: Point) =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

// 24 rotações possíveis no espaço 3D
function rotations(p: Point): Point[] {
  const [x, y, z] = p;

  return [
    [x, y, z],
    [x, -y, -z],
    [x, z, -y],
    [x, -z, y],
    [-x, y, -z],
    [-x, -y, z],
    [-x, z, y],
    [-x, -z, -y],

    [y, x, -z],
    [y, -x, z],
    [y, z, x],
    [y, -z, -x],
    [-y, x, z],
    [-y, -x, -z],
    [-y, z, -x],
    [-y, -z, x],

    [z, x, y],
    [z, -x, -y],
    [z, y, -x],
    [z, -y, x],
    [-z, x, -y],
    [-z, -x, y],
    [-z, y, x],
    [-z, -y, -x],
  ];
}

// aplica rotação k (0..23) em todos pontos
function rotateScanner(scanner: Point[], r: number): Point[] {
  return scanner.map((p) => rotations(p)[r]);
}

// tenta alinhar scanner B com conjunto fixo A
export function tryAlign(
  fixed: Set<string>,
  scanner: Point[],
): { offset: Point; aligned: Point[] } | null {
  const fixedArr = Array.from(fixed).map(
    (s) => s.split(",").map(Number) as Point,
  );

  for (let r = 0; r < 24; r++) {
    const rotated = scanner.map((p) => rotations(p)[r]);

    const count = new Map<string, number>();

    for (const fa of fixedArr) {
      for (const rb of rotated) {
        const offset = sub(fa, rb);
        const key = offset.join(",");

        count.set(key, (count.get(key) || 0) + 1);

        if (count.get(key)! >= 12) {
          const aligned = rotated.map((p) => add(p, offset));
          return { offset, aligned };
        }
      }
    }
  }

  return null;
}

function manhattan(a: Point, b: Point): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

export function largestScannerDistance(scanners: Point[]): number {
  let max = 0;

  for (let i = 0; i < scanners.length; i++) {
    for (let j = i + 1; j < scanners.length; j++) {
      const d = manhattan(scanners[i], scanners[j]);
      if (d > max) max = d;
    }
  }

  return max;
}

export function reconstructBeaconMap(scanners: Scanner[]) {
  const fixed = new Set<string>();
  const scannerPositions: Point[] = [];

  for (const b of scanners[0].beacons) {
    fixed.add(`${b[0]},${b[1]},${b[2]}`);
  }

  scannerPositions.push([0, 0, 0]);

  const unresolved = new Set<number>();
  for (let i = 1; i < scanners.length; i++) {
    unresolved.add(i);
  }

  while (unresolved.size > 0) {
    let progress = false;

    for (const i of Array.from(unresolved)) {
      const result = tryAlign(fixed, scanners[i].beacons);

      if (result) {
        progress = true;
        unresolved.delete(i);

        scannerPositions.push(result.offset);

        for (const p of result.aligned) {
          fixed.add(`${p[0]},${p[1]},${p[2]}`);
        }
      }
    }

    if (!progress) {
      throw new Error("Failed to align all scanners");
    }
  }

  return {
    beaconsCount: fixed.size,
    scannerPositions,
  };
}
