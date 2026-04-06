import { Food } from "./utils";

export function part2Run(foods: Food[]) {
  const allergenMap = new Map<string, Set<string>>();

  // mesma lógica da Parte 1
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

  // ---------------- RESOLVER (constraint propagation) ----------------

  const resolved = new Map<string, string>(); // allergen -> ingredient

  while (resolved.size < allergenMap.size) {
    for (const [allergen, candidates] of allergenMap.entries()) {
      if (candidates.size === 1) {
        const ingredient = [...candidates][0];

        if (!resolved.has(allergen)) {
          resolved.set(allergen, ingredient);

          // remover dos outros
          for (const [
            otherAllergen,
            otherCandidates,
          ] of allergenMap.entries()) {
            if (otherAllergen !== allergen) {
              otherCandidates.delete(ingredient);
            }
          }
        }
      }
    }
  }

  // ---------------- ORDENAR E FORMATAR ----------------

  return [...resolved.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, ingredient]) => ingredient)
    .join(",");
}
