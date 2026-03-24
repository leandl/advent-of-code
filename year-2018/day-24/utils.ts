export type Army = "immune" | "infection";

export type Group = {
  id: number;
  army: Army;
  units: number;
  hp: number;
  attackDamage: number;
  attackType: string;
  initiative: number;
  weaknesses: Set<string>;
  immunities: Set<string>;
};

export function effectivePower(g: Group): number {
  return g.units * g.attackDamage;
}

export function damage(attacker: Group, defender: Group): number {
  if (defender.immunities.has(attacker.attackType)) return 0;
  let dmg = effectivePower(attacker);
  if (defender.weaknesses.has(attacker.attackType)) dmg *= 2;
  return dmg;
}

export function parseGroups(lines: string[]): Group[] {
  const groups: Group[] = [];
  let army: Army = "immune";
  let id = 0;

  for (const line of lines) {
    if (line.endsWith(":")) {
      army = line.startsWith("Immune") ? "immune" : "infection";
      continue;
    }
    if (!line) continue;

    const regex =
      /(\d+) units each with (\d+) hit points(?: \((.*?)\))? .* does (\d+) (\w+) damage at initiative (\d+)/;

    const m = line.match(regex)!;

    const units = +m[1];
    const hp = +m[2];
    const special = m[3];
    const attackDamage = +m[4];
    const attackType = m[5];
    const initiative = +m[6];

    const weaknesses = new Set<string>();
    const immunities = new Set<string>();

    if (special) {
      for (const part of special.split(";")) {
        if (part.includes("weak to")) {
          part
            .replace("weak to ", "")
            .split(", ")
            .forEach((w) => weaknesses.add(w.trim()));
        } else if (part.includes("immune to")) {
          part
            .replace("immune to ", "")
            .split(", ")
            .forEach((i) => immunities.add(i.trim()));
        }
      }
    }

    groups.push({
      id: id++,
      army,
      units,
      hp,
      attackDamage,
      attackType,
      initiative,
      weaknesses,
      immunities,
    });
  }

  return groups;
}
