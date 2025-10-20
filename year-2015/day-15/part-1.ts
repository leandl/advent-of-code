import {
  generateCompositions,
  Ingredient,
  parseIngredient,
  regexIngredient,
} from "./utils";

export function part1Run(lines: string[]) {
  const ingredients = new Array<Ingredient>();
  for (const line of lines) {
    const match = regexIngredient.exec(line);
    if (match) {
      const ingredient = parseIngredient(match);
      ingredients.push(ingredient);
    }
  }

  let maxScore = 0;
  for (const composition of generateCompositions(ingredients.length, 100)) {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;

    for (let index = 0; index < ingredients.length; index++) {
      const ingredient = ingredients[index];
      const teaspoons = composition[index];

      capacity += ingredient.capacity * teaspoons;
      durability += ingredient.durability * teaspoons;
      flavor += ingredient.flavor * teaspoons;
      texture += ingredient.texture * teaspoons;
    }

    if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
      continue;
    }

    const score = capacity * durability * flavor * texture;
    maxScore = Math.max(maxScore, score);
  }

  return maxScore;
}
