import { knotHash } from "./utils";

function hexToBits(hex: string): string {
  return [...hex]
    .map((c) => parseInt(c, 16).toString(2).padStart(4, "0"))
    .join("");
}

export function part1Run(key: string) {
  let used = 0;

  for (let row = 0; row < 128; row++) {
    const hash = knotHash(`${key}-${row}`);
    const bits = hexToBits(hash);

    for (const b of bits) {
      if (b === "1") used++;
    }
  }

  return used;
}
