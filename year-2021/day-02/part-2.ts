import { parseCommands } from "./utils";

export function part2Run(lines: string[]) {
  const commands = parseCommands(lines);

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const command of commands) {
    switch (command.direction) {
      case "down":
        aim += command.value;
        break;

      case "up":
        aim -= command.value;
        break;

      case "forward":
        horizontal += command.value;
        depth += aim * command.value;
        break;
    }
  }

  return horizontal * depth;
}
