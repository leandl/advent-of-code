export type State = {
  x: number;
  y: number;
  path: string;
};

export const DIRECTOINS = [
  { dx: 0, dy: -1, move: "U" },
  { dx: 0, dy: 1, move: "D" },
  { dx: -1, dy: 0, move: "L" },
  { dx: 1, dy: 0, move: "R" },
];

export function isOpen(char: string): boolean {
  return ["b", "c", "d", "e", "f"].includes(char);
}
