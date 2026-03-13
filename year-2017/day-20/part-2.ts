import { Particle, Vec3 } from "./utils";

function key([x, y, z]: Vec3) {
  return `${x},${y},${z}`;
}

export function part2Run(particles: Particle[]) {
  let stableTicks = 0;

  while (stableTicks < 100) {
    const map = new Map<string, number[]>();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!p.alive) continue;

      // update velocity
      p.v[0] += p.a[0];
      p.v[1] += p.a[1];
      p.v[2] += p.a[2];

      // update position
      p.p[0] += p.v[0];
      p.p[1] += p.v[1];
      p.p[2] += p.v[2];

      const k = key(p.p);

      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(i);
    }

    let collision = false;

    for (const ids of map.values()) {
      if (ids.length > 1) {
        collision = true;
        for (const id of ids) {
          particles[id].alive = false;
        }
      }
    }

    if (collision) {
      stableTicks = 0;
    } else {
      stableTicks++;
    }
  }

  return particles.filter((p) => p.alive).length;
}
