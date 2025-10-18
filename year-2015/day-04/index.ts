import { createHash } from "crypto";

// const puzzleInput = "abcdef";
const puzzleInput = "iwrupvqb";

function puzzleRun(puzzleInput: string, charStartWith: string) {
  let n = 0;

  while (true) {
    const texto = `${puzzleInput}${n}`;
    const hash = createHash("md5").update(texto).digest("hex");

    if (hash.startsWith(charStartWith)) {
      break;
    }

    n += 1;
  }

  return n;
}

const resultPart1 = puzzleRun(puzzleInput, "00000");
console.log("Result Part 1: ", resultPart1);

const resultPart2 = puzzleRun(puzzleInput, "000000");
console.log("Result Part 2: ", resultPart2);
