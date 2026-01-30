import { simulateLanternfish } from "./utils";

export function part1Run(initialTimers: number[]): number {
  return simulateLanternfish(initialTimers, 80);
}
