type PairInsertionRules = Map<string, string>;
type PairCounts = Map<string, number>;
type CharCounts = Map<string, number>;

export type Polymer = {
  template: string;
  rules: PairInsertionRules;
};

export function parsePolymer(input: string): Polymer {
  const [templatePart, rulesPart] = input.trim().split("\n\n");

  const rules: PairInsertionRules = new Map();

  for (const line of rulesPart.split("\n")) {
    const [pair, insert] = line.split(" -> ");
    rules.set(pair, insert);
  }

  return {
    template: templatePart,
    rules,
  };
}

function applyPolymerStep(polymer: string, rules: PairInsertionRules): string {
  let result = "";

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];
    result += polymer[i];

    if (rules.has(pair)) {
      result += rules.get(pair);
    }
  }

  // adiciona último caractere
  result += polymer[polymer.length - 1];

  return result;
}

export function runPolymerization(
  template: string,
  rules: PairInsertionRules,
  steps: number,
): string {
  let polymer = template;

  for (let i = 0; i < steps; i++) {
    polymer = applyPolymerStep(polymer, rules);
  }

  return polymer;
}

export function countElements(polymer: string): Map<string, number> {
  const counts = new Map<string, number>();

  for (const char of polymer) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  return counts;
}

export function getMostMinusLeast(counts: Map<string, number>): number {
  const values = Array.from(counts.values());
  return Math.max(...values) - Math.min(...values);
}

function initializePairCounts(template: string): PairCounts {
  const counts: PairCounts = new Map();

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    counts.set(pair, (counts.get(pair) ?? 0) + 1);
  }

  return counts;
}

function step(pairCounts: PairCounts, rules: PairInsertionRules): PairCounts {
  const next: PairCounts = new Map();

  for (const [pair, count] of pairCounts.entries()) {
    const insert = rules.get(pair);

    if (!insert) {
      next.set(pair, (next.get(pair) ?? 0) + count);
      continue;
    }

    const left = pair[0] + insert;
    const right = insert + pair[1];

    next.set(left, (next.get(left) ?? 0) + count);
    next.set(right, (next.get(right) ?? 0) + count);
  }

  return next;
}

export function runSteps(
  template: string,
  rules: PairInsertionRules,
  steps: number,
): PairCounts {
  let pairCounts = initializePairCounts(template);

  for (let i = 0; i < steps; i++) {
    pairCounts = step(pairCounts, rules);
  }

  return pairCounts;
}

export function countCharacters(
  pairCounts: PairCounts,
  template: string,
): CharCounts {
  const counts: CharCounts = new Map();

  // conta apenas a primeira letra de cada par
  for (const [pair, count] of pairCounts.entries()) {
    const char = pair[0];
    counts.set(char, (counts.get(char) ?? 0) + count);
  }

  // adiciona o último caractere do template original
  const lastChar = template[template.length - 1];
  counts.set(lastChar, (counts.get(lastChar) ?? 0) + 1);

  return counts;
}
