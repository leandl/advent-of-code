import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseGameConfig } from "./utils";

const inputContent = await readInputContent("year-2018", "day-09", "data");

// const inputContent = "10 players; last marble is worth 1618 points";
// const inputContent = "13 players; last marble is worth 7999 points";
// const inputContent = "17 players; last marble is worth 1104 points";
// const inputContent = "21 players; last marble is worth 6111 points";
// const inputContent = "30 players; last marble is worth 5807 points";

const resultPart1 = part1Run(parseGameConfig(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseGameConfig(inputContent));
console.log("Result Part 2: ", resultPart2);
