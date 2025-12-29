export type Rule = [number, number];
export type Update = number[];

interface ParsedInput {
  rules: Rule[];
  updates: Update[];
}

export function parseInputPuzzle(lines: string[]): ParsedInput {
  const rules: Rule[] = [];
  const updates: Update[] = [];

  let i = 0;

  // Ler regras até a linha vazia
  while (i < lines.length && lines[i].trim() !== "") {
    const [x, y] = lines[i].split("|").map(Number);
    rules.push([x, y]);
    i++;
  }

  // Pular linhas vazias
  while (i < lines.length && lines[i].trim() === "") {
    i++;
  }

  // Ler updates
  while (i < lines.length) {
    const update = lines[i].split(",").map(Number);
    updates.push(update);
    i++;
  }

  return { rules, updates };
}

export function isValidUpdate(update: Update, rules: Rule[]): boolean {
  const position = new Map<number, number>();

  for (let index = 0; index < update.length; index++) {
    const page = update[index];
    position.set(page, index);
  }

  for (const [before, after] of rules) {
    if (position.has(before) && position.has(after)) {
      if (position.get(before)! > position.get(after)!) {
        return false; // regra violada
      }
    }
  }

  return true;
}
