export type Program = {
  name: string;
  weight: number;
  children: string[];
};

export function parsePrograms(lines: string[]): Program[] {
  return lines.map((line) => {
    // Ex: "fwft (72) -> ktlj, cntj, xhth"
    const [left, right] = line.split("->").map((s) => s.trim());

    const [name, weightPart] = left.split(" ");
    const weight = Number(weightPart.replace(/[()]/g, ""));

    const children = right ? right.split(",").map((s) => s.trim()) : [];

    return {
      name,
      weight,
      children,
    };
  });
}
