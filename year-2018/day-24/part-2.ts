import { Army, damage, effectivePower, Group } from "./utils";

type SimulateReturn = {
  winner: Army | null;
  units: number;
  stalemate: boolean;
};

function simulate(original: Group[], boost: number): SimulateReturn {
  // deep copy
  let groups: Group[] = original.map((g) => ({
    ...g,
    units: g.units,
    attackDamage: g.army === "immune" ? g.attackDamage + boost : g.attackDamage,
  }));

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

    // --- ATTACK ---
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

    groups = groups.filter((g) => g.units > 0);

    const immuneAlive = groups.some((g) => g.army === "immune");
    const infectionAlive = groups.some((g) => g.army === "infection");

    if (!immuneAlive) {
      return {
        winner: "infection",
        units: groups.reduce((s, g) => s + g.units, 0),
        stalemate: false,
      };
    }

    if (!infectionAlive) {
      return {
        winner: "immune",
        units: groups.reduce((s, g) => s + g.units, 0),
        stalemate: false,
      };
    }

    if (totalKilled === 0) {
      return { winner: null, units: 0, stalemate: true };
    }
  }
}

type GroupsFactory = () => Group[];

export function part2Run(createInitialGroups: GroupsFactory) {
  let left = 0;
  let right = 1;

  // encontra limite superior
  while (true) {
    const originalGroups = createInitialGroups();
    const res = simulate(originalGroups, right);
    if (res.winner === "immune") break;
    right *= 2;
  }

  let answer = 0;

  // binary search
  while (left <= right) {
    const originalGroups = createInitialGroups();
    const mid = Math.floor((left + right) / 2);
    const res = simulate(originalGroups, mid);

    if (res.winner === "immune") {
      answer = res.units;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}
