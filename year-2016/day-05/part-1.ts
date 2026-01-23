import { md5 } from "../../utils/function";

const PREFIX = "00000";
const PASSWORD_LENGTH = 8;

export function part1Run(doorId: string) {
  let password = "";
  let index = 0;

  while (password.length < PASSWORD_LENGTH) {
    const hash = md5(doorId + index);

    if (hash.startsWith(PREFIX)) {
      password += hash[5];
    }

    index++;
  }

  return password;
}
