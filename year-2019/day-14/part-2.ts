import { calculateOreForFuel, ReactionTable } from "./utils";

export function part2Run(reactions: ReactionTable) {
  const ORE_LIMIT = 1_000_000_000_000;

  let low = 1;
  let high = 1;

  while (calculateOreForFuel(reactions, high) < ORE_LIMIT) {
    high *= 2;
  }

  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);

    const oreNeeded = calculateOreForFuel(reactions, mid);

    if (oreNeeded <= ORE_LIMIT) {
      low = mid; // pode tentar mais
    } else {
      high = mid - 1; // passou do limite
    }
  }

  return low;
}
