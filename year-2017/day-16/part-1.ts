import { RunParams } from "./utils";

export function part1Run({ size, steps }: RunParams) {
  const programs = Array.from({ length: size }, (_, i) =>
    String.fromCharCode(97 + i),
  );

  for (const step of steps) {
    const type = step[0];

    if (type === "s") {
      const x = Number(step.slice(1));
      const tail = programs.splice(-x);
      programs.unshift(...tail);
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

  return programs.join("");
}
