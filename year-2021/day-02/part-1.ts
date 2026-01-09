import { parseCommands } from "./utils";

export function part1Run(lines: string[]) {
  const commands = parseCommands(lines);

  let horizontal = 0;
  let depth = 0;

  for (const command of commands) {
    switch (command.direction) {
      case "forward":
        horizontal += command.value;
        break;
      case "down":
        depth += command.value;
        break;
      case "up":
        depth -= command.value;
        break;
    }
  }

  return horizontal * depth;
}
