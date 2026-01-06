import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2017", "day-01");

// const inputContent = "1122";
// const inputContent = "1111";
// const inputContent= "1234"
// const inputContent= "91212129"

const resultPart1 = part1Run(inputContent);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(inputContent);
console.log("Result Part 2: ", resultPart2);
