import { RunParams } from "./utils";

function performDance(programs: string[], steps: string[]) {
  for (const step of steps) {
    const type = step[0];

    if (type === "s") {
      const x = Number(step.slice(1));
      const moved = programs.splice(-x);
      programs.unshift(...moved);
    } else if (type === "x") {
      const [a, b] = step.slice(1).split("/").map(Number);
      [programs[a], programs[b]] = [programs[b], programs[a]];
    } else if (type === "p") {
      const [a, b] = step.slice(1).split("/");
      const ia = programs.indexOf(a);
      const ib = programs.indexOf(b);
      [programs[ia], programs[ib]] = [programs[ib], programs[ia]];
    }
  }
}

export function part2Run({ size, steps }: RunParams) {
  let programs = Array.from({ length: size }, (_, i) =>
    String.fromCharCode(97 + i),
  );

  const seen = new Map<string, number>();
  const total = 1_000_000_000;

  for (let i = 0; i < total; i++) {
    const state = programs.join("");

    if (seen.has(state)) {
      const cycleStart = seen.get(state)!;
      const cycleLength = i - cycleStart;
      const remaining = (total - i) % cycleLength;

      for (let j = 0; j < remaining; j++) {
        performDance(programs, steps);
      }

      return programs.join("");
    }

    seen.set(state, i);
    performDance(programs, steps);
  }

  return programs.join("");
}
