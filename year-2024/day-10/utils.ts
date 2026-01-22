export type GridNumber = number[][];
export type Point = { r: number; c: number };

export const directions: Point[] = [
  { r: -1, c: 0 }, // cima
  { r: 1, c: 0 }, // baixo
  { r: 0, c: -1 }, // esquerda
  { r: 0, c: 1 }, // direita
];

export function parseGridNumber(lines: string[]): GridNumber {
  return lines.map((line) => line.split("").map(Number));
}
