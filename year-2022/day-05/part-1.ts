import { ParsedInput } from "./utils";

export function part1Run({ moves, stacks }: ParsedInput) {
  for (const { count, from, to } of moves) {
    for (let i = 0; i < count; i++) {
      const crate = stacks[from].pop();
      if (crate) {
        stacks[to].push(crate);
      }
    }
  }

  return stacks.map((stack) => stack.at(-1) ?? "").join("");
}
