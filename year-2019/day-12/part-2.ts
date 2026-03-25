import { Moon } from "./utils";

type AxisMotion = {
  pos: number;
  vel: number;
};

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function getAxis(moons: Moon[], axis: "x" | "y" | "z"): AxisMotion[] {
  return moons.map((m) => ({
    pos: m.pos[axis],
    vel: m.vel[axis],
  }));
}

function findCycleAxis(initial: AxisMotion[]): number {
  const state = initial.map((m) => ({ ...m }));

  let steps = 0;

  while (true) {
    steps++;

    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        if (state[i].pos < state[j].pos) {
          state[i].vel++;
          state[j].vel--;
        } else if (state[i].pos > state[j].pos) {
          state[i].vel--;
          state[j].vel++;
        }
      }
    }

    for (const m of state) {
      m.pos += m.vel;
    }

    let same = true;
    for (let i = 0; i < state.length; i++) {
      if (state[i].pos !== initial[i].pos || state[i].vel !== initial[i].vel) {
        same = false;
        break;
      }
    }

    if (same) return steps;
  }
}

export function part2Run(moons: Moon[]) {
  const cycleX = findCycleAxis(getAxis(moons, "x"));
  const cycleY = findCycleAxis(getAxis(moons, "y"));
  const cycleZ = findCycleAxis(getAxis(moons, "z"));

  return lcm(lcm(cycleX, cycleY), cycleZ);
}
