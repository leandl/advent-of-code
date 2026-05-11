type Dir = "U" | "D" | "L" | "R";

export type Instruction = {
  dir: Dir;
  steps: number;
};

export const DIRS: Record<Dir, [number, number]> = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

export function parsePlainInstructions(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [dirStr, stepsStr] = line.split(" ");
    return {
      dir: dirStr as Dir,
      steps: Number(stepsStr),
    };
  });
}

const HEX_DIR_MAP: Record<string, Dir> = {
  "0": "R",
  "1": "D",
  "2": "L",
  "3": "U",
};

export function parseHexEncodedInstructions(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const hex = line.match(/\(#([0-9a-f]+)\)/)![1];

    const distanceHex = hex.slice(0, 5);
    const directionCode = hex[5];

    return {
      dir: HEX_DIR_MAP[directionCode],
      steps: parseInt(distanceHex, 16),
    };
  });
}

export function solveFromInstructions(instr: Instruction[]): number {
  let x = 0;
  let y = 0;

  const points: [number, number][] = [[x, y]];
  let perimeter = 0;

  for (const { dir, steps } of instr) {
    const [dx, dy] = DIRS[dir];

    x += dx * steps;
    y += dy * steps;

    points.push([x, y]);
    perimeter += steps;
  }

  // Shoelace
  let area2 = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    area2 += x1 * y2 - x2 * y1;
  }

  const area = Math.abs(area2) / 2;

  // Pick
  return area + perimeter / 2 + 1;
}
