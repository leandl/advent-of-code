import { Entry } from "./utils";

function includesAll(a: string, b: string): boolean {
  return [...b].every((char) => a.includes(char));
}

function decodeEntry(entry: Entry): number {
  const mapping = new Map<number, string>();
  const reverse = new Map<string, number>();

  const patterns = entry.patterns;

  // Identificar dígitos únicos
  for (const p of patterns) {
    switch (p.length) {
      case 2:
        mapping.set(1, p);
        break;
      case 3:
        mapping.set(7, p);
        break;
      case 4:
        mapping.set(4, p);
        break;
      case 7:
        mapping.set(8, p);
        break;
    }
  }

  // Dígitos com 6 segmentos → 0, 6, 9
  const length6 = patterns.filter((p) => p.length === 6);

  for (const p of length6) {
    if (includesAll(p, mapping.get(4)!)) {
      mapping.set(9, p);
    } else if (includesAll(p, mapping.get(1)!)) {
      mapping.set(0, p);
    } else {
      mapping.set(6, p);
    }
  }

  // Dígitos com 5 segmentos → 2, 3, 5
  const length5 = patterns.filter((p) => p.length === 5);

  for (const p of length5) {
    if (includesAll(p, mapping.get(1)!)) {
      mapping.set(3, p);
    } else if (includesAll(mapping.get(6)!, p)) {
      mapping.set(5, p);
    } else {
      mapping.set(2, p);
    }
  }

  // Criar mapa reverso
  for (const [digit, pattern] of mapping.entries()) {
    reverse.set(pattern, digit);
  }

  // Decodificar valor de saída
  const value = entry.output.map((o) => reverse.get(o)).join("");

  return Number(value);
}

export function part2Run(entries: Entry[]) {
  return entries.reduce((sum, entry) => sum + decodeEntry(entry), 0);
}
