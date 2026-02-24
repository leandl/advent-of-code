import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2017", "day-09", "data");

// const inputContent = "{}";
// const inputContent = "{{{}}}";
// const inputContent = "{{},{}}";
// const inputContent = "{{{},{},{{}}}}";
// const inputContent = "{<a>,<a>,<a>,<a>}";
// const inputContent = "{{<ab>},{<ab>},{<ab>},{<ab>}}";
// const inputContent = "{{<!!>},{<!!>},{<!!>},{<!!>}}";
// const inputContent = "{{<a!>},{<a!>},{<a!>},{<ab>}}";

// const inputContent = "<>";
// const inputContent = "<random characters>";
// const inputContent = "<<<<>";
// const inputContent = "<{!>}>";
// const inputContent = "<!!>";
// const inputContent = "<!!!>>";
// const inputContent = '<{o"i!a,<{i<a>';

const resultPart1 = part1Run(inputContent);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(inputContent);
console.log("Result Part 2: ", resultPart2);
