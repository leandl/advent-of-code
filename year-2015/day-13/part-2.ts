import {
  generateGraphPotentialHappiness,
  getCombinations,
  GraphPotentialHappiness,
  parseTableArrangement,
  regexTableArrangement,
} from "./utils";

const PERSON_ME = "ME";

export function part2Run(lines: string[]) {
  const people = new Set<string>([PERSON_ME]);
  const graph = new Map<GraphPotentialHappiness, number>();

  for (const line of lines) {
    const match = regexTableArrangement.exec(line);
    if (match) {
      const [personA, personB, potentialHappiness] =
        parseTableArrangement(match);

      const keyGraph = generateGraphPotentialHappiness(personA, personB);

      people.add(personA);
      people.add(personB);

      graph.set(keyGraph, potentialHappiness);
    }
  }

  let maxPotentialHappiness = 0;
  const combinations = getCombinations(Array.from(people));
  for (const combination of combinations) {
    let potentialHappinessFinal = 0;
    for (let index = 0; index < combination.length; index++) {
      const currentPerson = combination[index];
      const nextPerson =
        index === combination.length - 1
          ? combination[0]
          : combination[index + 1];

      if (currentPerson === PERSON_ME || nextPerson === PERSON_ME) {
        continue;
      }

      const keyGraph1 = generateGraphPotentialHappiness(
        currentPerson,
        nextPerson
      );

      const keyGraph2 = generateGraphPotentialHappiness(
        nextPerson,
        currentPerson
      );

      if (graph.has(keyGraph1) && graph.has(keyGraph2)) {
        potentialHappinessFinal +=
          graph.get(keyGraph1)! + graph.get(keyGraph2)!;
      } else {
        console.log(`graph not found: '${keyGraph1}' ou ${keyGraph2}`);
      }
    }

    maxPotentialHappiness = Math.max(
      maxPotentialHappiness,
      potentialHappinessFinal
    );
  }

  return maxPotentialHappiness;
}
