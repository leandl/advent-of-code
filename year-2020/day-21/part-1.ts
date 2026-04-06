import { Food } from "./utils";

export function part1Run(foods: Food[]) {
  const allergenMap = new Map<string, Set<string>>();

  // construir interseções
  for (const food of foods) {
    for (const allergen of food.allergens) {
      if (!allergenMap.has(allergen)) {
        allergenMap.set(allergen, new Set(food.ingredients));
      } else {
        const current = allergenMap.get(allergen)!;
        const intersection = new Set<string>();

        for (const ing of current) {
          if (food.ingredients.has(ing)) {
            intersection.add(ing);
          }
        }

        allergenMap.set(allergen, intersection);
      }
    }
  }

  // ingredientes que podem conter alergênicos
  const possiblyAllergenic = new Set<string>();
  for (const set of allergenMap.values()) {
    for (const ing of set) {
      possiblyAllergenic.add(ing);
    }
  }

  // contar os seguros
  let count = 0;

  for (const food of foods) {
    for (const ing of food.ingredients) {
      if (!possiblyAllergenic.has(ing)) {
        count++;
      }
    }
  }

  return count;
}
