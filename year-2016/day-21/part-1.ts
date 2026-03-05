import { RunParams } from "./utils";

export function part1Run({ password, instructions }: RunParams) {
  let arr = password.split("");

  const rotateLeft = (steps: number) => {
    steps %= arr.length;
    arr = arr.slice(steps).concat(arr.slice(0, steps));
  };

  const rotateRight = (steps: number) => {
    steps %= arr.length;
    arr = arr.slice(-steps).concat(arr.slice(0, -steps));
  };

  for (const instr of instructions) {
    switch (instr.type) {
      case "swap_pos":
        [arr[instr.x], arr[instr.y]] = [arr[instr.y], arr[instr.x]];
        break;

      case "swap_letter": {
        const x = arr.indexOf(instr.x);
        const y = arr.indexOf(instr.y);
        [arr[x], arr[y]] = [arr[y], arr[x]];
        break;
      }

      case "rotate_left":
        rotateLeft(instr.steps);
        break;

      case "rotate_right":
        rotateRight(instr.steps);
        break;

      case "rotate_pos": {
        const idx = arr.indexOf(instr.letter);
        let steps = 1 + idx;
        if (idx >= 4) steps += 1;
        rotateRight(steps);
        break;
      }

      case "reverse": {
        const part = arr.slice(instr.x, instr.y + 1).reverse();
        arr.splice(instr.x, instr.y - instr.x + 1, ...part);
        break;
      }

      case "move": {
        const [ch] = arr.splice(instr.x, 1);
        arr.splice(instr.y, 0, ch);
        break;
      }
    }
  }

  return arr.join("");
}
