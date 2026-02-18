import { openToClose, scoreTable } from "./utils";

export function part1Run(lines: string[]) {
  let totalScore = 0;

  for (const line of lines) {
    const stack: string[] = [];

    for (const char of line) {
      if (char in openToClose) {
        stack.push(char);
      } else {
        const lastOpen = stack.pop();

        if (!lastOpen || openToClose[lastOpen] !== char) {
          totalScore += scoreTable[char] ?? 0;
          break;
        }
      }
    }
  }

  return totalScore;
}
