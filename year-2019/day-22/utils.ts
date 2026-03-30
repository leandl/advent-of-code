export type ShuffleOp =
  | { type: "new_stack" }
  | { type: "cut"; n: bigint }
  | { type: "increment"; n: bigint };

export function parseShuffle(lines: string[]): ShuffleOp[] {
  return lines.map((line) => {
    if (line === "deal into new stack") {
      return { type: "new_stack" };
    }

    if (line.startsWith("cut")) {
      const n = parseInt(line.split(" ")[1], 10);
      return { type: "cut", n: BigInt(n) };
    }

    if (line.startsWith("deal with increment")) {
      const n = parseInt(line.split(" ").pop()!, 10);
      return { type: "increment", n: BigInt(n) };
    }

    throw new Error(`Unknown instruction: ${line}`);
  });
}
