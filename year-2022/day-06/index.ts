import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2022", "day-06");

// const inputContent = "bvwbjplbgvbhsrlpgdmjqwftvncz";
// const inputContent = "nppdvjthqldpwncqszvftbrmjlhg";
// const inputContent = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
// const inputContent = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

const resultPart1 = part1Run(inputContent);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(inputContent);
console.log("Result Part 2: ", resultPart2);
