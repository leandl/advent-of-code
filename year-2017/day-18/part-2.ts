import { Instruction, Operand } from "./utils";

type ProgramState = {
  id: number;
  reg: Map<string, number>;
  ip: number;
  queue: number[];
  waiting: boolean;
  sendCount: number;
};

function step(
  state: ProgramState,
  other: ProgramState,
  program: Instruction[],
): void {
  if (state.ip < 0 || state.ip >= program.length) {
    state.waiting = true;
    return;
  }

  const inst = program[state.ip];

  const get = (o: Operand): number =>
    o.type === "num" ? o.value : (state.reg.get(o.value) ?? 0);

  switch (inst.op) {
    case "snd":
      other.queue.push(get(inst.x));
      state.sendCount++;
      state.ip++;
      break;

    case "set":
      state.reg.set(inst.x, get(inst.y));
      state.ip++;
      break;

    case "add":
      state.reg.set(inst.x, (state.reg.get(inst.x) ?? 0) + get(inst.y));
      state.ip++;
      break;

    case "mul":
      state.reg.set(inst.x, (state.reg.get(inst.x) ?? 0) * get(inst.y));
      state.ip++;
      break;

    case "mod":
      state.reg.set(inst.x, (state.reg.get(inst.x) ?? 0) % get(inst.y));
      state.ip++;
      break;

    case "rcv":
      if (state.queue.length === 0) {
        state.waiting = true;
      } else {
        state.waiting = false;
        if (typeof inst.x.value === "string") {
          state.reg.set(inst.x.value, state.queue.shift()!);
        }
        state.ip++;
      }
      break;

    case "jgz":
      if (get(inst.x) > 0) {
        state.ip += get(inst.y);
      } else {
        state.ip++;
      }
      break;
  }
}

export function part2Run(program: Instruction[]) {
  const p0: ProgramState = {
    id: 0,
    reg: new Map([["p", 0]]),
    ip: 0,
    queue: [],
    waiting: false,
    sendCount: 0,
  };

  const p1: ProgramState = {
    id: 1,
    reg: new Map([["p", 1]]),
    ip: 0,
    queue: [],
    waiting: false,
    sendCount: 0,
  };

  while (true) {
    step(p0, p1, program);
    step(p1, p0, program);

    const deadlock =
      p0.waiting &&
      p1.waiting &&
      p0.queue.length === 0 &&
      p1.queue.length === 0;

    if (deadlock) break;
  }

  return p1.sendCount;
}
