export type Food = {
  ingredients: Set<string>;
  allergens: Set<string>;
};

export function parseFoods(lines: string[]): Food[] {
  return lines.filter(Boolean).map((line) => {
    const [left, right] = line.split(" (contains ");

    const ingredients = new Set(left.split(" "));

    const allergens = right
      ? new Set(right.replace(")", "").split(", "))
      : new Set<string>();

    return { ingredients, allergens };
  });
}
