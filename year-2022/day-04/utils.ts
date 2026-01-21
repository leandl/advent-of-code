type Range = [number, number];
type AssignmentPair = [Range, Range];

export function parseLines(lines: string[]): AssignmentPair[] {
  return lines.map((line) => {
    const [left, right] = line.split(",");

    const [a, b] = left.split("-").map(Number);
    const [c, d] = right.split("-").map(Number);

    return [
      [a, b],
      [c, d],
    ];
  });
}
