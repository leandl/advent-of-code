import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseParticles } from "./utils";

const lines = await readInputLines("year-2017", "day-20", "data");

const resultPart1 = part1Run(parseParticles(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseParticles(lines));
console.log("Result Part 2: ", resultPart2);
