import {
  Boss,
  getAllCombinations,
  getCostByCombination,
  isPlayerBeatsTheBoss,
} from "./utils";

export function part2Run(boss: Boss) {
  let maxCost = 0;
  for (const combination of getAllCombinations()) {
    const currentCost = getCostByCombination(combination);
    if (
      maxCost < currentCost &&
      !isPlayerBeatsTheBoss(100, boss, combination)
    ) {
      maxCost = currentCost;
    }
  }

  return maxCost;
}
