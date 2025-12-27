import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const contentInput = await readInputContent("year-2024", "day-03");
// const contentInput =
//   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const resultPart1 = part1Run(contentInput);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(contentInput);
console.log("Result Part 2: ", resultPart2);
