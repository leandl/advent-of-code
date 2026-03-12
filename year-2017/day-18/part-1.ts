import { Instruction, Operand } from "./utils";

export function part1Run(program: Instruction[]) {
  const reg = new Map<string, number>();
  let ip = 0;
  let lastSound = 0;

  const get = (o: Operand): number =>
    o.type === "num" ? o.value : (reg.get(o.value) ?? 0);

  while (ip >= 0 && ip < program.length) {
    const inst = program[ip];

    switch (inst.op) {
      case "snd":
        lastSound = get(inst.x);
        break;

      case "set":
        reg.set(inst.x, get(inst.y));
        break;

      case "add":
        reg.set(inst.x, (reg.get(inst.x) ?? 0) + get(inst.y));
        break;

      case "mul":
        reg.set(inst.x, (reg.get(inst.x) ?? 0) * get(inst.y));
        break;

      case "mod":
        reg.set(inst.x, (reg.get(inst.x) ?? 0) % get(inst.y));
        break;

      case "rcv":
        if (get(inst.x) !== 0) return lastSound;
        break;

      case "jgz":
        if (get(inst.x) > 0) {
          ip += get(inst.y);
          continue;
        }
        break;
    }

    ip++;
  }

  throw new Error("Program terminated");
}
