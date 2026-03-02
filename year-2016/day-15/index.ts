import { pipe } from "../../utils/function";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { addDisc, parseDiscs } from "./utils";

const lines = await readInputLines("year-2016", "day-15", "data");
// const lines = await readInputLines("year-2016", "day-15", "example");

const resultPart1 = part1Run(parseDiscs(lines));
console.log("Result Part 1: ", resultPart1);

const parseDiscsAndAddDisc = pipe(
  parseDiscs,
  addDisc({ positions: 11, startPosition: 0 }),
);

const resultPart2 = part2Run(parseDiscsAndAddDisc(lines));
console.log("Result Part 2: ", resultPart2);
