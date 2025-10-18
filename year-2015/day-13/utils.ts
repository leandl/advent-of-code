export type GraphPotentialHappiness = `${string}->${string}`;

// David would lose 7 happiness units by sitting next to Bob.
export const regexTableArrangement =
  /(^.*?) would (.*?) (.*?) happiness units by sitting next to (.*?)\./;

export function parseTableArrangement(
  match: RegExpExecArray
): [string, string, number] {
  const signal = match[2];
  const numberPotentialHappiness = Number(match[3]);

  const potentialHappiness =
    signal === "lose"
      ? numberPotentialHappiness * -1
      : numberPotentialHappiness;

  return [match[1], match[4], potentialHappiness] as [string, string, number];
}

export function generateGraphPotentialHappiness(
  personFrom: string,
  personTo: string
): GraphPotentialHappiness {
  return `${personFrom}->${personTo}`;
}

export function getCombinations(people: string[]): string[][] {
  if (people.length === 0) {
    return [];
  }

  if (people.length == 1) {
    return [[people[0]]];
  }

  let combinations: string[][] = [];
  for (let index = 0; index < people.length; index++) {
    const currentPerson = people[index];
    const subPeople = people.filter((Person) => currentPerson !== Person);

    const newCombinations = getCombinations(subPeople).map((combination) => [
      currentPerson,
      ...combination,
    ]);
    combinations = [...combinations, ...newCombinations];
  }

  return combinations;
}
