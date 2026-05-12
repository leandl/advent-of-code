import { ModuleMap, simulateButtonPresses } from "./utils";

export function part1Run(modules: ModuleMap) {
  return simulateButtonPresses(modules, 1000);
}
