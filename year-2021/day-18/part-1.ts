import { add, magnitude, Node } from "./utlts";

export function part1Run(lines: Array<Node[]>): number {
  let current = lines[0];

  for (let i = 1; i < lines.length; i++) {
    current = add(current, lines[i]);
  }

  return magnitude(current);
}
