export type Direction = "U" | "D" | "L" | "R";

export type Motion = {
  direction: Direction;
  steps: number;
};

export function parseMotions(lines: string[]): Motion[] {
  return lines.map((line) => {
    const [direction, steps] = line.split(" ");
    return {
      direction: direction as Direction,
      steps: Number(steps),
    };
  });
}
