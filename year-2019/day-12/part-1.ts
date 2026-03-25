import { Moon } from "./utils";

function applyGravity(moons: Moon[]) {
  for (let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      const a = moons[i];
      const b = moons[j];

      for (const axis of ["x", "y", "z"] as const) {
        if (a.pos[axis] < b.pos[axis]) {
          a.vel[axis]++;
          b.vel[axis]--;
        } else if (a.pos[axis] > b.pos[axis]) {
          a.vel[axis]--;
          b.vel[axis]++;
        }
      }
    }
  }
}

function applyVelocity(moons: Moon[]) {
  for (const moon of moons) {
    moon.pos.x += moon.vel.x;
    moon.pos.y += moon.vel.y;
    moon.pos.z += moon.vel.z;
  }
}

function simulate(moons: Moon[], steps: number) {
  for (let i = 0; i < steps; i++) {
    applyGravity(moons);
    applyVelocity(moons);
  }
}

function energy(moon: Moon): number {
  const pot =
    Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z);

  const kin =
    Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z);

  return pot * kin;
}

function totalEnergy(moons: Moon[]): number {
  return moons.reduce((sum, m) => sum + energy(m), 0);
}

export function part1Run(moons: Moon[]) {
  simulate(moons, 1000);

  return totalEnergy(moons);
}
