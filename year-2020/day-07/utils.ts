export type BagColor = string;

type BagRuleContain = {
  color: BagColor;
  quantity: number;
};

export type BagRule = {
  color: BagColor;
  contains: BagRuleContain[];
};

export function parseBagRules(lines: string[]): BagRule[] {
  return lines.map((line) => {
    const [outerPart, innerPart] = line.split(" bags contain ");
    const color = outerPart.trim();

    // Caso: "no other bags."
    if (innerPart.startsWith("no other bags")) {
      return {
        color,
        contains: [],
      };
    }

    const contains = innerPart.split(",").map((part) => {
      // Ex: "1 bright white bag." ou "2 muted yellow bags."
      const match = part.match(/(\d+)\s+(.+?)\s+bag/);
      if (!match) {
        throw new Error(`Formato inválido: ${part}`);
      }

      return {
        quantity: Number(match[1]),
        color: match[2],
      };
    });

    return {
      color,
      contains,
    };
  });
}
