import { md5 } from "../../utils/function";
import { findTriple, hasFiveInRow } from "./utils";

export function part1Run(salt: string) {
  const cache = new Map<number, string>();
  let keysFound = 0;
  let index = 0;

  function getHash(i: number): string {
    if (!cache.has(i)) {
      cache.set(i, md5(salt + i));
    }
    return cache.get(i)!;
  }

  while (true) {
    const hash = getHash(index);
    const tripleChar = findTriple(hash);

    if (tripleChar) {
      for (let i = index + 1; i <= index + 1000; i++) {
        const futureHash = getHash(i);
        if (hasFiveInRow(futureHash, tripleChar)) {
          keysFound++;
          if (keysFound === 64) {
            return index;
          }
          break;
        }
      }
    }

    index++;
  }
}
