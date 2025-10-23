import {
  Boss,
  getAllCombinations,
  getCostByCombination,
  isPlayerBeatsTheBoss,
} from "./utils";

export function part1Run(boss: Boss) {
  let minCost = 1_000_000;
  for (const combination of getAllCombinations()) {
    const currentCost = getCostByCombination(combination);
    if (minCost > currentCost && isPlayerBeatsTheBoss(100, boss, combination)) {
      minCost = currentCost;
    }
  }

  return minCost;
}
