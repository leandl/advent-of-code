export type Target = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export function parseTarget(input: string): Target {
  const match = input.match(/x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/);
  if (!match) throw new Error("Invalid input");

  return {
    xMin: Number(match[1]),
    xMax: Number(match[2]),
    yMin: Number(match[3]),
    yMax: Number(match[4]),
  };
}
