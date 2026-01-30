import { simulateLanternfish } from "./utils";

export function part2Run(initialTimers: number[]) {
  return simulateLanternfish(initialTimers, 256);
}
