import { Block } from "./utlts";

export function part1Run(blocks: Block[]) {
  const stack: { index: number; addY: number }[] = [];
  const digits = Array(14).fill(0);

  for (let i = 0; i < 14; i++) {
    const { divZ, addX, addY } = blocks[i];

    if (divZ === 1) {
      // push
      stack.push({ index: i, addY });
    } else {
      // pop
      const prev = stack.pop()!;
      const diff = prev.addY + addX;

      // queremos maximizar (parte 1)
      for (let d = 9; d >= 1; d--) {
        const other = d + diff;

        if (other >= 1 && other <= 9) {
          digits[prev.index] = d;
          digits[i] = other;
          break;
        }
      }
    }
  }

  return digits.join("");
}
