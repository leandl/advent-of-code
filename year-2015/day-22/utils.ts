import { updateData } from "../../utils/function";

type SpellName = "Magic Missile" | "Drain" | "Shield" | "Poison" | "Recharge";

type Spell = {
  name: SpellName;
  cost: number;
  duration: number; // 0 for instant spells
};

function createSpell(name: SpellName, cost: number, duration: number): Spell {
  return {
    name,
    cost,
    duration,
  };
}

const SPELLS: Spell[] = [
  createSpell("Magic Missile", 53, 0),
  createSpell("Drain", 73, 0),
  createSpell("Shield", 113, 6),
  createSpell("Poison", 173, 6),
  createSpell("Recharge", 229, 5),
];

export function getPossibleSpells(playerMana: number, timer: Timer): Spell[] {
  return SPELLS.filter((sp) => {
    if (sp.name === "Shield" && timer.shield > 0) return false;
    if (sp.name === "Poison" && timer.poison > 0) return false;
    if (sp.name === "Recharge" && timer.recharge > 0) return false;
    return playerMana >= sp.cost;
  });
}

type Turn = "player" | "boss";

export type Player = {
  hp: number;
  mana: number;
  armor: number;
};

export type Boss = {
  hp: number;
  damage: number;
};

type Timer = {
  shield: number;
  poison: number;
  recharge: number;
};

type State = {
  turn: Turn;
  player: Player;
  boss: Boss;
  timer: Timer;
  manaSpent: number;
  history: string[];
};

type StateTurn = {
  player: Player;
  boss: Boss;
  timer: Timer;
};

function applyEffects(player: Player, boss: Boss, timer: Timer): StateTurn {
  let playerMana = player.mana;
  let playerArmor = 0;

  let bossHp = boss.hp;

  let { shield: shieldT, poison: poisonT, recharge: rechargeT } = timer;

  if (shieldT > 0) playerArmor = 7;
  if (poisonT > 0) bossHp -= 3;
  if (rechargeT > 0) playerMana += 101;

  const newTimer: Timer = {
    shield: Math.max(0, shieldT - 1),
    poison: Math.max(0, poisonT - 1),
    recharge: Math.max(0, rechargeT - 1),
  };

  return {
    player: updateData(player, {
      armor: playerArmor,
      mana: playerMana,
    }),
    boss: updateData(boss, {
      hp: bossHp,
    }),
    timer: newTimer,
  };
}

function serializeState(s: State): string {
  const serializeTimer = Object.values(s.timer).join(",");
  return `${s.turn}-${s.player.hp}-${s.player.mana}-${s.boss.hp}-${serializeTimer}`;
}

export function findMinMana(
  player: Player,
  boss: Boss,
  mode: "MEDIUM" | "HARD"
): { mana: number; history: string[] } | null {
  const start: State = {
    turn: "player",
    player,
    boss,
    timer: {
      shield: 0,
      poison: 0,
      recharge: 0,
    },
    manaSpent: 0,
    history: [],
  };

  const pq: State[] = [start];
  const bestCost = new Map<string, number>();
  let bestWin: { mana: number; history: string[] } | null = null;

  while (pq.length > 0) {
    // sort by mana spent (Dijkstra)
    pq.sort((a, b) => a.manaSpent - b.manaSpent);
    const state = pq.shift()!;
    const key = serializeState(state);

    if (bestCost.has(key) && bestCost.get(key)! <= state.manaSpent) continue;
    bestCost.set(key, state.manaSpent);

    const stateTurn = applyEffects(state.player, state.boss, state.timer);

    // Check if boss died from effects
    if (stateTurn.boss.hp <= 0) {
      if (!bestWin || state.manaSpent < bestWin.mana) {
        bestWin = { mana: state.manaSpent, history: state.history };
      }
      continue;
    }

    if (state.turn === "boss") {
      // Boss turn
      const bossDamage = Math.max(
        1,
        stateTurn.boss.damage - stateTurn.player.armor
      );
      const newPlayerHp = stateTurn.player.hp - bossDamage;
      if (newPlayerHp <= 0) continue; // player dead

      pq.push({
        turn: "player",
        timer: stateTurn.timer,
        boss: updateData(stateTurn.boss, { hp: stateTurn.boss.hp }),
        player: updateData(stateTurn.player, {
          hp: newPlayerHp,
          mana: stateTurn.player.mana,
        }),
        manaSpent: state.manaSpent,
        history: state.history,
      });
    } else {
      const spells = getPossibleSpells(stateTurn.player.mana, stateTurn.timer);
      if (spells.length === 0) continue; // can't cast anything -> lose

      const currentPlayerHp =
        mode === "MEDIUM" ? stateTurn.player.hp : stateTurn.player.hp - 1;
      if (currentPlayerHp <= 0) {
        continue;
      }

      for (const sp of spells) {
        const newManaSpent = state.manaSpent + sp.cost;
        if (bestWin && newManaSpent >= bestWin.mana) continue;

        let newPlayerHp = currentPlayerHp;
        let newPlayerMana = stateTurn.player.mana - sp.cost;
        let newBossHp = stateTurn.boss.hp;

        let {
          shield: shieldT,
          poison: poisonT,
          recharge: rechargeT,
        } = stateTurn.timer;

        // Instant effects
        if (sp.name === "Magic Missile") newBossHp -= 4;
        else if (sp.name === "Drain") {
          newBossHp -= 2;
          newPlayerHp += 2;
        } else if (sp.name === "Shield") shieldT = sp.duration;
        else if (sp.name === "Poison") poisonT = sp.duration;
        else if (sp.name === "Recharge") rechargeT = sp.duration;

        const newTimer: Timer = {
          shield: shieldT,
          poison: poisonT,
          recharge: rechargeT,
        };

        const newHistory = [...state.history, sp.name];

        if (newBossHp <= 0) {
          if (!bestWin || newManaSpent < bestWin.mana) {
            bestWin = { mana: newManaSpent, history: newHistory };
          }
          continue;
        }

        pq.push({
          turn: "boss",
          player: updateData(stateTurn.player, {
            hp: newPlayerHp,
            mana: newPlayerMana,
          }),
          boss: updateData(stateTurn.boss, {
            hp: newBossHp,
          }),
          timer: newTimer,
          manaSpent: newManaSpent,
          history: newHistory,
        });
      }
    }
  }

  return bestWin;
}
