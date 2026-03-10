export type Layer = {
  depth: number;
  range: number;
};

export function parseLayers(lines: string[]): Layer[] {
  return lines.map((line) => {
    const [depth, range] = line.split(":").map((s) => parseInt(s.trim(), 10));
    return { depth, range };
  });
}
