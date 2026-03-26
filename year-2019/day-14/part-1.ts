import { calculateOreForFuel, ReactionTable } from "./utils";

export function part1Run(reactions: ReactionTable) {
  return calculateOreForFuel(reactions, 1);
}
