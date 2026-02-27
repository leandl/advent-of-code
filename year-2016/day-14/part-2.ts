import { md5 } from "../../utils/function";
import { findTriple, hasFiveInRow } from "./utils";

function stretchedHash(input: string): string {
  let hash = md5(input);
  for (let i = 0; i < 2016; i++) {
    hash = md5(hash);
  }
  return hash;
}

export function part2Run(salt: string) {
  const cache = new Map<number, string>();
  let keysFound = 0;
  let index = 0;

  function getHash(i: number): string {
    if (!cache.has(i)) {
      cache.set(i, stretchedHash(salt + i));
    }
    return cache.get(i)!;
  }

  while (true) {
    const hash = getHash(index);
    const tripleChar = findTriple(hash);

    if (tripleChar) {
      for (let i = index + 1; i <= index + 1000; i++) {
        if (hasFiveInRow(getHash(i), tripleChar)) {
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
