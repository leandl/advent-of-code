import { RunParams } from "./utils";

export function part2Run({ password, instructions }: RunParams): string {
  let arr = password.split("");

  const rotateLeft = (a: string[], steps: number) => {
    steps %= a.length;
    return a.slice(steps).concat(a.slice(0, steps));
  };

  const rotateRight = (a: string[], steps: number) => {
    steps %= a.length;
    return a.slice(-steps).concat(a.slice(0, -steps));
  };

  for (const instr of [...instructions].reverse()) {
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
        arr = rotateRight(arr, instr.steps);
        break;

      case "rotate_right":
        arr = rotateLeft(arr, instr.steps);
        break;

      case "reverse": {
        const part = arr.slice(instr.x, instr.y + 1).reverse();
        arr.splice(instr.x, instr.y - instr.x + 1, ...part);
        break;
      }

      case "move": {
        // invert move X -> Y  =>  Y -> X
        const [ch] = arr.splice(instr.y, 1);
        arr.splice(instr.x, 0, ch);
        break;
      }

      case "rotate_pos": {
        const current = arr.join("");

        for (let i = 0; i < arr.length; i++) {
          const candidate = rotateLeft(arr, i);

          const idx = candidate.indexOf(instr.letter);
          let steps = 1 + idx;
          if (idx >= 4) steps++;

          const test = rotateRight(candidate, steps);

          if (test.join("") === current) {
            arr = candidate;
            break;
          }
        }

        break;
      }
    }
  }

  return arr.join("");
}
