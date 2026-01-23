import { md5 } from "../../utils/function";

const PREFIX = "00000";
const PASSWORD_LENGTH = 8;

export function part2Run(doorId: string) {
  const password: Array<string | null> = Array(8).fill(null);
  let filled = 0;
  let index = 0;

  while (filled < PASSWORD_LENGTH) {
    const hash = md5(doorId + index);

    if (hash.startsWith(PREFIX)) {
      const positionChar = hash[5];
      const valueChar = hash[6];

      // verifica se é um número de 0 a 7
      const position = Number(positionChar);

      if (
        position >= 0 &&
        position <= 7 &&
        Number.isInteger(position) &&
        password[position] === null
      ) {
        password[position] = valueChar;
        filled++;
      }
    }

    index++;
  }

  return password.join("");
}
