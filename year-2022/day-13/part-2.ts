import { Packet } from "./utils";

function compare(left: Packet, right: Packet): number {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      if (i >= left.length) return -1;
      if (i >= right.length) return 1;

      const res = compare(left[i], right[i]);
      if (res !== 0) return res;
    }
    return 0;
  }

  return typeof left === "number"
    ? compare([left], right)
    : compare(left, [right]);
}

export function part2Run(packets: Packet[]) {
  const divider1: Packet = [[2]];
  const divider2: Packet = [[6]];

  packets.push(divider1, divider2);

  packets.sort(compare);

  const index1 =
    packets.findIndex((p) => JSON.stringify(p) === JSON.stringify(divider1)) +
    1;
  const index2 =
    packets.findIndex((p) => JSON.stringify(p) === JSON.stringify(divider2)) +
    1;

  return index1 * index2;
}
