export type Component = [number, number];

export function parseComponents(lines: string[]): Component[] {
  return lines.map((line) => {
    const [a, b] = line.split("/").map(Number);
    return [a, b] as Component;
  });
}
