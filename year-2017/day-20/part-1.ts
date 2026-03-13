import { Particle, Vec3 } from "./utils";

function manhattan([x, y, z]: Vec3): number {
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

export function part1Run(particles: Particle[]) {
  particles.sort((p1, p2) => {
    const a = manhattan(p1.a) - manhattan(p2.a);
    if (a !== 0) return a;

    const v = manhattan(p1.v) - manhattan(p2.v);
    if (v !== 0) return v;

    return manhattan(p1.p) - manhattan(p2.p);
  });

  return particles[0].id;
}
