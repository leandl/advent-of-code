type Vec3 = { x: number; y: number; z: number };

export type Moon = {
  pos: Vec3;
  vel: Vec3;
};

export function parseMoons(lines: string[]): Moon[] {
  return lines.map((line) => {
    const [x, y, z] = line.match(/-?\d+/g)!.map(Number);

    return {
      pos: { x, y, z },
      vel: { x: 0, y: 0, z: 0 },
    };
  });
}
