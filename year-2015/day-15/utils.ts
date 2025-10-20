// Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
export const regexIngredient =
  /(^.*): capacity (.*), durability (.*), flavor (.*), texture (.*), calories (.*)/;

export type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

export function parseIngredient(match: RegExpExecArray): Ingredient {
  return {
    name: match[1],
    capacity: Number(match[2]),
    durability: Number(match[3]),
    flavor: Number(match[4]),
    texture: Number(match[5]),
    calories: Number(match[6]),
  } as Ingredient;
}

export function* generateCompositions(
  k: number,
  total: number
): Generator<number[]> {
  function* rec(
    index: number,
    remaining: number,
    current: number[]
  ): Generator<number[]> {
    if (index === k - 1) {
      yield [...current, remaining];
      return;
    }

    for (let q = 0; q <= remaining; q++) {
      for (const composition of rec(index + 1, remaining - q, [
        ...current,
        q,
      ])) {
        yield composition;
      }
    }
  }

  for (const composition of rec(0, total, [])) {
    yield composition;
  }
}
