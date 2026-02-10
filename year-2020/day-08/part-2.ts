import { Instruction } from "./utils";

function runProgram(program: Instruction[]): {
  terminated: boolean;
  acc: number;
} {
  let acc = 0;
  let ip = 0;
  const executed = new Set<number>();

  while (true) {
    if (ip === program.length) {
      return { terminated: true, acc };
    }

    if (executed.has(ip)) {
      return { terminated: false, acc };
    }

    executed.add(ip);

    const { op, arg } = program[ip];

    switch (op) {
      case "acc":
        acc += arg;
        ip++;
        break;
      case "jmp":
        ip += arg;
        break;
      case "nop":
        ip++;
        break;
    }
  }
}

export function part2Run(instructions: Instruction[]) {
  for (let i = 0; i < instructions.length; i++) {
    const instr = instructions[i];

    if (instr.op === "acc") continue;

    // cópia rasa do programa
    const modified = instructions.map((i) => ({ ...i }));

    // troca nop <-> jmp
    modified[i].op = instr.op === "nop" ? "jmp" : "nop";

    const result = runProgram(modified);

    if (result.terminated) {
      return result.acc;
    }
  }

  throw new Error("Nenhuma correção válida encontrada");
}
