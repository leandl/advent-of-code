import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseBlueprints } from "./utils";

const lines = await readInputLines("year-2022", "day-19", "data");

const resultPart1 = part1Run(parseBlueprints(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseBlueprints(lines));
console.log("Result Part 2: ", resultPart2);
