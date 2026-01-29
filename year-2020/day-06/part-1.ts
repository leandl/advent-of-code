import { Group } from "./utils";

export function part1Run(groups: Group[]) {
  return groups.reduce((sum, group) => {
    const answers = new Set(group.join(""));
    return sum + answers.size;
  }, 0);
}
