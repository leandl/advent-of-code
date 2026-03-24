import { damage, effectivePower, Group } from "./utils";

export function part1Run(groups: Group[]) {
  while (true) {
    // --- TARGET SELECTION ---
    const order = [...groups]
      .filter((g) => g.units > 0)
      .sort((a, b) => {
        const ep = effectivePower(b) - effectivePower(a);
        if (ep !== 0) return ep;
        return b.initiative - a.initiative;
      });

    const targets = new Map<Group, Group>();
    const chosen = new Set<Group>();

    for (const attacker of order) {
      let best: Group | null = null;
      let bestDamage = 0;

      for (const defender of groups) {
        if (
          defender.army === attacker.army ||
          defender.units <= 0 ||
          chosen.has(defender)
        )
          continue;

        const dmg = damage(attacker, defender);
        if (dmg === 0) continue;

        if (
          dmg > bestDamage ||
          (dmg === bestDamage &&
            (effectivePower(defender) > (best ? effectivePower(best) : -1) ||
              (effectivePower(defender) ===
                (best ? effectivePower(best) : -1) &&
                defender.initiative > (best ? best.initiative : -1))))
        ) {
          best = defender;
          bestDamage = dmg;
        }
      }

      if (best) {
        targets.set(attacker, best);
        chosen.add(best);
      }
    }

    // --- ATTACK PHASE ---
    const attackOrder = [...groups]
      .filter((g) => g.units > 0)
      .sort((a, b) => b.initiative - a.initiative);

    let totalKilled = 0;

    for (const attacker of attackOrder) {
      if (attacker.units <= 0) continue;

      const defender = targets.get(attacker);
      if (!defender || defender.units <= 0) continue;

      const dmg = damage(attacker, defender);
      const killed = Math.floor(dmg / defender.hp);

      if (killed > 0) {
        defender.units -= killed;
        totalKilled += killed;
      }
    }

    // remove mortos
    groups = groups.filter((g) => g.units > 0);

    const immuneAlive = groups.some((g) => g.army === "immune");
    const infectionAlive = groups.some((g) => g.army === "infection");

    if (!immuneAlive || !infectionAlive) {
      return groups.reduce((sum, g) => sum + g.units, 0);
    }

    // stalemate (ninguém morre)
    if (totalKilled === 0) {
      return groups.reduce((sum, g) => sum + g.units, 0);
    }
  }
}
