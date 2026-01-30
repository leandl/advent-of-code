import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseLanternfish } from "./utils";

const inputContent = await readInputContent("year-2021", "day-06");
// const inputContent = "3,4,3,1,2";

const fish = parseLanternfish(inputContent);

const resultPart1 = part1Run(fish);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(fish);
console.log("Result Part 2: ", resultPart2);
