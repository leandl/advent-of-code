export type Direction = 0 | 1 | 2 | 3;

type Instruction = {
  turn: "R" | "L";
  steps: number;
};

export function parseInputPuzzle(input: string): Instruction[] {
  return input.split(", ").map((i) => ({
    turn: i[0] as "R" | "L",
    steps: parseInt(i.slice(1), 10),
  }));
}
