import { knot } from "./utils";

export function part2Run(input: string) {
  const asciiLengths = [
    ...Array.from(new TextEncoder().encode(input.trim())),
    17,
    31,
    73,
    47,
    23,
  ];

  const sparseHash = knot(asciiLengths, 64);

  let denseHash = "";

  for (let i = 0; i < 256; i += 16) {
    let xor = 0;

    for (let j = 0; j < 16; j++) {
      xor ^= sparseHash[i + j];
    }

    denseHash += xor.toString(16).padStart(2, "0");
  }

  return denseHash;
}
