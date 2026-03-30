export const DIRS = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

export function isLetter(c: string) {
  return c >= "A" && c <= "Z";
}
