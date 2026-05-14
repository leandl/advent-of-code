import { IntcodeComputer } from "../../utils/intcode-computer";

export function part2Run(program: number[]) {
  const computer = new IntcodeComputer(program);

  const panels = new Map<string, number>();

  let x = 0;
  let y = 0;
  let dir = 0;

  const key = () => `${x},${y}`;

  // painel inicial branco
  panels.set(key(), 1);

  let outputs: number[] = [];

  // input inicial
  computer.provideInput(panels.get(key()) ?? 0);

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      outputs.push(res.value);

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

        // novo input
        computer.provideInput(panels.get(key()) ?? 0);
      }
    }

    if (res.type === "need_input") {
      computer.provideInput(panels.get(key()) ?? 0);
    }

    if (res.type === "halt") {
      break;
    }
  }

  //  render
  const coords = [...panels.keys()].map((k) => k.split(",").map(Number));

  const xs = coords.map(([x]) => x);
  const ys = coords.map(([_, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  let output = "";

  for (let yy = minY; yy <= maxY; yy++) {
    let line = "";

    for (let xx = minX; xx <= maxX; xx++) {
      const color = panels.get(`${xx},${yy}`) ?? 0;
      line += color === 1 ? "#" : " ";
    }

    output += "\n" + line;
  }

  return output;
}
