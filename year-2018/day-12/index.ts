import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parsePlantSimulation } from "./utils";

const lines = await readInputLines("year-2018", "day-12", "data");
// const lines = await readInputLines("year-2018", "day-12", "example");

const resultPart1 = part1Run(parsePlantSimulation(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parsePlantSimulation(lines));
console.log("Result Part 2: ", resultPart2);
