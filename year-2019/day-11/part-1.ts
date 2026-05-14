import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  const computer = new IntcodeComputer(program);

  const panels = new Map<string, number>();
  const painted = new Set<string>();

  let x = 0;
  let y = 0;
  let dir = 0; // 0 up, 1 right, 2 down, 3 left

  const key = () => `${x},${y}`;

  let outputs: number[] = [];

  // primeira entrada (painel inicial)
  computer.provideInput(0);

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      outputs.push(res.value);

      if (outputs.length === 2) {
        const [color, turn] = outputs;
        outputs = [];

        // pintar
        panels.set(key(), color);
        painted.add(key());

        // girar
        if (turn === 0) dir = (dir + 3) % 4;
        else dir = (dir + 1) % 4;

        // mover
        if (dir === 0) y--;
        if (dir === 1) x++;
        if (dir === 2) y++;
        if (dir === 3) x--;

        // próximo input = cor do painel atual
        computer.provideInput(panels.get(key()) ?? 0);
      }
    }

    if (res.type === "need_input") {
      // garante input sempre disponível
      computer.provideInput(panels.get(key()) ?? 0);
    }

    if (res.type === "halt") {
      break;
    }
  }

  return painted.size;
}
