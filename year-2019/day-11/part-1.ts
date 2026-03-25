import { IntcodeComputer, IntcodeIO } from "./utils";

export function part1Run(program: number[]) {
  const computer = new IntcodeComputer(program);

  const panels = new Map<string, number>();
  const painted = new Set<string>();

  let x = 0;
  let y = 0;
  let dir = 0; // 0 up, 1 right, 2 down, 3 left

  const key = () => `${x},${y}`;

  let outputs: number[] = [];

  const io: IntcodeIO = {
    input: () => panels.get(key()) ?? 0,
    output: (value: number) => {
      outputs.push(value);

      if (outputs.length === 2) {
        const [color, turn] = outputs;
        outputs = [];

        // pintar
        panels.set(key(), color);
        painted.add(key());

        // girar
        if (turn === 0)
          dir = (dir + 3) % 4; // left
        else dir = (dir + 1) % 4; // right

        // mover
        if (dir === 0) y--;
        if (dir === 1) x++;
        if (dir === 2) y++;
        if (dir === 3) x--;
      }
    },
  };

  while (!computer.halted) {
    computer.run(io);
  }

  return painted.size;
}
