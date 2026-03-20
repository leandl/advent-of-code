import { GridFactory } from "../../utils/parsers";
import { simulate } from "./utils";

export function part2Run(createInitialGrid: GridFactory<string>) {
  let elfAttackPower = 4;
  while (true) {
    const grid = createInitialGrid();
    const result = simulate(grid, elfAttackPower, true);

    if (result !== null) {
      return result;
    }

    elfAttackPower++;
  }
}
