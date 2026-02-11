import { Entry } from "./utils";

export function part1Run(entries: Entry[]) {
  let count = 0;

  for (const entry of entries) {
    for (const value of entry.output) {
      const length = value.length;

      if (length === 2 || length === 3 || length === 4 || length === 7) {
        count++;
      }
    }
  }

  return count;
}
