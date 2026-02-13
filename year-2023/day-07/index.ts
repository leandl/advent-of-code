import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { buildStrengthMap, parseHands } from "./utils";

const lines = await readInputLines("year-2023", "day-07", "data");
// const lines = await readInputLines("year-2023", "day-07", "example");

const rules1 = {
  useJoker: false,
  cardOrder: "23456789TJQKA",
};

const rules2 = {
  useJoker: true,
  cardOrder: "J23456789TQKA",
};

const resultPart1 = part1Run(
  parseHands(lines, rules1),
  buildStrengthMap(rules1.cardOrder),
);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(
  parseHands(lines, rules2),
  buildStrengthMap(rules2.cardOrder),
);
console.log("Result Part 2: ", resultPart2);
