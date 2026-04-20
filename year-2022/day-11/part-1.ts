import { Monkey, simulate } from "./utils";

export function part1Run(monkeys: Monkey[]) {
  return simulate(monkeys, 20, (n) => Math.floor(n / 3));
}
