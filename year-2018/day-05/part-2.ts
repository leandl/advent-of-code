import { fullyReactPolymer } from "./utils";

export function part2Run(polymer: string) {
  const aCode = "a".charCodeAt(0);
  let minLength = Infinity;

  for (let i = 0; i < 26; i++) {
    const unit = String.fromCharCode(aCode + i);

    // Remove o tipo atual (maiúsculo e minúsculo)
    const filtered = polymer
      .split("")
      .filter((c) => c.toLowerCase() !== unit)
      .join("");

    const reactedLength = fullyReactPolymer(filtered);
    minLength = Math.min(minLength, reactedLength);
  }

  return minLength;
}
