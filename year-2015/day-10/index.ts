function lookAndSay(puzzleInput: string): string {
  let finalString = "";
  let countCharEquals = 1;
  let currentChar = puzzleInput[0];

  for (let index = 1; index < puzzleInput.length; index++) {
    const char = puzzleInput[index];

    if (char === currentChar) {
      countCharEquals += 1;
    } else {
      finalString = `${finalString}${countCharEquals}${currentChar}`;
      countCharEquals = 1;
      currentChar = char;
    }
  }

  finalString = `${finalString}${countCharEquals}${currentChar}`;

  return finalString;
}

function puzzleRun(puzzleInput: string, times: number) {
  let currentInput = puzzleInput;
  for (let index = 0; index < times; index++) {
    currentInput = lookAndSay(currentInput);
  }

  return currentInput.length;
}

const puzzleInput = "1321131112";
// const puzzleInput = "111221";

const resultPart1 = puzzleRun(puzzleInput, 40);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = puzzleRun(puzzleInput, 50);
console.log("Result Part 2: ", resultPart2);
