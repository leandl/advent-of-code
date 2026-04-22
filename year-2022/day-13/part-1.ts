import { Packet, PacketPair } from "./utils";

function compare(left: Packet, right: Packet): number {
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const len = Math.max(left.length, right.length);

    for (let i = 0; i < len; i++) {
      if (i >= left.length) return -1;
      if (i >= right.length) return 1;

      const result = compare(left[i], right[i]);
      if (result !== 0) return result;
    }

    return 0;
  }

  return typeof left === "number"
    ? compare([left], right)
    : compare(left, [right]);
}

export function part1Run(pairs: PacketPair[]) {
  let sum = 0;

  pairs.forEach(([left, right], index) => {
    if (compare(left, right) === -1) {
      sum += index + 1;
    }
  });

  return sum;
}
