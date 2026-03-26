type Material = {
  name: string;
  amount: number;
};

type ProductionRule = {
  output: Material;
  inputs: Material[];
};

export type ReactionTable = Map<string, ProductionRule>;

export function parseReactions(lines: string[]): ReactionTable {
  const reactions: ReactionTable = new Map();

  lines.forEach((line) => {
    const [inputsPart, outputPart] = line.split(" => ");

    const output = parseMaterial(outputPart);
    const inputs = inputsPart.split(", ").map(parseMaterial);

    reactions.set(output.name, { output, inputs });
  });

  return reactions;
}

function parseMaterial(str: string): Material {
  const [amount, name] = str.split(" ");
  return { name, amount: Number(amount) };
}

export function calculateOreForFuel(
  reactions: ReactionTable,
  fuelAmount = 1,
): number {
  const required = new Map<string, number>();
  const surplus = new Map<string, number>();

  required.set("FUEL", fuelAmount);

  let totalOre = 0;

  while (required.size > 0) {
    const [chemical, neededAmount] = required.entries().next().value!;
    required.delete(chemical);

    if (chemical === "ORE") {
      totalOre += neededAmount;
      continue;
    }

    const availableSurplus = surplus.get(chemical) ?? 0;

    if (availableSurplus >= neededAmount) {
      surplus.set(chemical, availableSurplus - neededAmount);
      continue;
    }

    const netNeeded = neededAmount - availableSurplus;
    surplus.set(chemical, 0);

    const rule = reactions.get(chemical)!;

    const batchSize = rule.output.amount;
    const batches = Math.ceil(netNeeded / batchSize);

    const producedAmount = batches * batchSize;
    const leftoverAmount = producedAmount - netNeeded;

    if (leftoverAmount > 0) {
      surplus.set(chemical, (surplus.get(chemical) ?? 0) + leftoverAmount);
    }

    for (const input of rule.inputs) {
      const current = required.get(input.name) ?? 0;
      required.set(input.name, current + input.amount * batches);
    }
  }

  return totalOre;
}
