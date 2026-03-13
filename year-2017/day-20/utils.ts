export type Vec3 = [number, number, number];

export type Particle = {
  id: number;
  alive: boolean;
  p: Vec3;
  v: Vec3;
  a: Vec3;
};

export function parseParticles(lines: string[]): Particle[] {
  const regex =
    /p=<\s*(-?\d+),(-?\d+),(-?\d+)>, v=<\s*(-?\d+),(-?\d+),(-?\d+)>, a=<\s*(-?\d+),(-?\d+),(-?\d+)>/;

  return lines.map((line, i) => {
    const m = line.match(regex);
    if (!m) throw new Error("Invalid input");

    return {
      id: i,
      alive: true,
      p: [Number(m[1]), Number(m[2]), Number(m[3])],
      v: [Number(m[4]), Number(m[5]), Number(m[6])],
      a: [Number(m[7]), Number(m[8]), Number(m[9])],
    };
  });
}
