import { generateNewPassword } from "./utils";

export function part2Run(puzzleInput: string) {
  const nextPassword = generateNewPassword(puzzleInput);
  const nextNextPassword = generateNewPassword(nextPassword);
  return nextNextPassword;
}
