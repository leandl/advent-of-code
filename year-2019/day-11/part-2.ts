import { IntcodeComputer, IntcodeIO } from "./utils";

export function part2Run(program: number[]) {
  const computer = new IntcodeComputer(program);

  const panels = new Map<string, number>();

  let x = 0;
  let y = 0;
  let dir = 0;

  const key = () => `${x},${y}`;

  panels.set(key(), 1);

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

        // girar
        if (turn === 0) dir = (dir + 3) % 4;
        else dir = (dir + 1) % 4;

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

  const coords = [...panels.keys()].map((k) => k.split(",").map(Number));

  const xs = coords.map(([x]) => x);
  const ys = coords.map(([_, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  let output = "";

  for (let y = minY; y <= maxY; y++) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      const color = panels.get(`${x},${y}`) ?? 0;
      line += color === 1 ? "#" : " ";
    }
    output += "\n" + line;
  }

  return output;
}
