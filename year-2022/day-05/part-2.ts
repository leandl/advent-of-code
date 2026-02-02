import { ParsedInput } from "./utils";

export function part2Run({ moves, stacks }: ParsedInput) {
  for (const { count, from, to } of moves) {
    const moved = stacks[from].splice(-count);
    stacks[to].push(...moved);
  }

  return stacks.map((s) => s.at(-1) ?? "").join("");
}
