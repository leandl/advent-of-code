import { CaveInput } from "./utils";

export function part1Run({ depth, target }: CaveInput) {
  const { x: maxX, y: maxY } = target;

  const erosion = new Map<string, number>();

  const key = (x: number, y: number) => `${x},${y}`;

  function getErosion(x: number, y: number): number {
    const k = key(x, y);
    if (erosion.has(k)) return erosion.get(k)!;

    let geo: number;

    if ((x === 0 && y === 0) || (x === maxX && y === maxY)) {
      geo = 0;
    } else if (y === 0) {
      geo = x * 16807;
    } else if (x === 0) {
      geo = y * 48271;
    } else {
      geo = getErosion(x - 1, y) * getErosion(x, y - 1);
    }

    const e = (geo + depth) % 20183;
    erosion.set(k, e);
    return e;
  }

  let risk = 0;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const e = getErosion(x, y);
      const type = e % 3;

      risk += type;
    }
  }

  return risk;
}
