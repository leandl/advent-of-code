import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const content = await readInputContent("year-2025", "day-02");
// const content =
//   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

const resultPart1 = part1Run(content);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(content);
console.log("Result Part 2: ", resultPart2);
