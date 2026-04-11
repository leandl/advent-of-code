import { add, magnitude, Node } from "./utlts";

export function part2Run(lines: Array<Node[]>) {
  let max = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i === j) continue;

      const a = lines[i];
      const b = lines[j];

      const result = add(a, b);
      const mag = magnitude(result);

      if (mag > max) {
        max = mag;
      }
    }
  }

  return max;
}
