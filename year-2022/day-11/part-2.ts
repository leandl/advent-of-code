import { Monkey, simulate } from "./utils";

export function part2Run(monkeys: Monkey[]) {
  const mod = monkeys.reduce((acc, m) => acc * m.testDivisor, 1);

  return simulate(monkeys, 10000, (n) => n % mod);
}
