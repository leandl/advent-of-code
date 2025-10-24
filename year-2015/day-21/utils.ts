export type Boss = {
  life: number;
  damage: number;
  armor: number;
};

export type Item = {
  name: string;
  cost: number;
  damage: number;
  armor: number;
};

function createItem(
  name: string,
  cost: number,
  damage: number,
  armor: number
): Item {
  return Object.freeze({
    name,
    cost,
    damage,
    armor,
  });
}

export const weapons: Record<string, Item> = {
  Dagger: createItem("Dagger", 8, 4, 0),
  Shortsword: createItem("Shortsword", 10, 5, 0),
  Warhammer: createItem("Warhammer", 25, 6, 0),
  Longsword: createItem("Longsword", 40, 7, 0),
  Greataxe: createItem("Greataxe", 74, 8, 0),
};

export const armor: Record<string, Item> = {
  Leather: createItem("Leather", 13, 0, 1),
  Chainmail: createItem("Chainmail", 31, 0, 2),
  Splintmail: createItem("Splintmail", 53, 0, 3),
  Bandedmail: createItem("Bandedmail", 75, 0, 4),
  Platemail: createItem("Platemail", 102, 0, 5),
};

export const rings: Record<string, Item> = {
  Damage_1: createItem("Damage_1", 25, 1, 0),
  Damage_2: createItem("Damage_2", 50, 2, 0),
  Damage_3: createItem("Damage_3", 100, 3, 0),
  Defense_1: createItem("Defense_1", 20, 0, 1),
  Defense_2: createItem("Defense_2", 40, 0, 2),
  Defense_3: createItem("Defense_3", 80, 0, 3),
};

function* getAllWeaponCombinations(): Generator<Item> {
  for (const weaponKey in weapons) {
    const weapon = weapons[weaponKey];
    yield weapon;
  }
}

function* getAllArmorCombinations(): Generator<Item | null> {
  yield null;

  for (const armorKey in armor) {
    yield armor[armorKey];
  }
}

type RingCombination = [null, null] | [Item, null] | [Item, Item];

function* getAllRingCombinations(): Generator<RingCombination> {
  yield [null, null];

  for (const ring1Key in rings) {
    yield [rings[ring1Key], null];

    for (const ring2Key in rings) {
      if (ring1Key !== ring2Key) yield [rings[ring1Key], rings[ring2Key]];
    }
  }
}

type Nullable<T> = T | null;
type Combination = [Item, Nullable<Item>, Nullable<Item>, Nullable<Item>];

export function* getAllCombinations(): Generator<Combination> {
  for (const weapon of getAllWeaponCombinations()) {
    for (const armor of getAllArmorCombinations()) {
      for (const [ring1, ring2] of getAllRingCombinations()) {
        yield [weapon, armor, ring1, ring2];
      }
    }
  }
}

export function getCostByCombination(combination: Combination): number {
  return combination.reduce(
    (acc, cur) => (cur === null ? acc : acc + cur.cost),
    0
  );
}

export function isPlayerBeatsTheBoss(
  playerLife: number,
  boss: Boss,
  combinationItens: Combination
): boolean {
  const player = combinationItens.reduce(
    (acc, cur) => {
      if (cur === null) {
        return acc;
      }

      return {
        attack: acc.attack + cur.damage,
        defense: acc.defense + cur.armor,
      };
    },
    { attack: 0, defense: 0 }
  );

  const attackBossByTurn = boss.damage - player.defense;
  const attackPlayerByTurn = player.attack - boss.armor;

  if (attackPlayerByTurn <= 0) {
    return false;
  }

  if (attackBossByTurn <= 0) {
    return true;
  }

  const playerHits = Math.ceil(boss.life / attackPlayerByTurn);
  const bossHits = Math.ceil(playerLife / attackBossByTurn);

  return playerHits <= bossHits;
}
