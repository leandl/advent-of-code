type Command = {
  direction: "forward" | "down" | "up";
  value: number;
};

export function parseCommands(lines: string[]): Command[] {
  return lines.map((line) => {
    const [direction, value] = line.split(" ");
    return {
      direction: direction as Command["direction"],
      value: Number(value),
    };
  });
}
