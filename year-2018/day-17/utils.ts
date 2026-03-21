export type Cell = "." | "#" | "|" | "~";

export const SPRING_X = 500;

export type Coord = { x: number; y: number };

export type ClayVeinVertical = {
  type: "VERTICAL";
  x: number;
  yStart: number;
  yEnd: number;
};

export type ClayVeinHorizontal = {
  type: "HORIZONTAL";
  y: number;
  xStart: number;
  xEnd: number;
};

export type ClayVein = ClayVeinVertical | ClayVeinHorizontal;

export type GroundScan = {
  veins: ClayVein[];
  clay: Set<string>;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};

export function parseGroundScan(lines: string[]): GroundScan {
  const veins: ClayVein[] = [];
  const clay = new Set<string>();

  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  for (const line of lines) {
    const [a, b] = line.split(", ");

    if (a.startsWith("x=")) {
      const x = Number(a.slice(2));
      const [yStart, yEnd] = b.slice(2).split("..").map(Number);

      veins.push({ type: "VERTICAL", x, yStart, yEnd });

      for (let y = yStart; y <= yEnd; y++) {
        clay.add(`${x},${y}`);
      }

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, yStart);
      maxY = Math.max(maxY, yEnd);
    } else {
      const y = Number(a.slice(2));
      const [xStart, xEnd] = b.slice(2).split("..").map(Number);

      veins.push({ type: "HORIZONTAL", y, xStart, xEnd });

      for (let x = xStart; x <= xEnd; x++) {
        clay.add(`${x},${y}`);
      }

      minX = Math.min(minX, xStart);
      maxX = Math.max(maxX, xEnd);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  return {
    veins,
    clay,
    bounds: { minX, maxX, minY, maxY },
  };
}
