export type Bot = {
  x: number;
  y: number;
  z: number;
  r: number;
};

export function parseBots(lines: string[]): Bot[] {
  return lines.map((line) => {
    const match = line.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/);
    if (!match) throw new Error("Invalid input: " + line);

    return {
      x: Number(match[1]),
      y: Number(match[2]),
      z: Number(match[3]),
      r: Number(match[4]),
    };
  });
}
