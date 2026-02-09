import { Program } from "./utils";

function runIntcode(program: Program, inputs: number[]): number {
  const memory = [...program]; // cópia independente
  let ip = 0;
  let inputIndex = 0;

  const getParam = (mode: number, value: number): number =>
    mode === 0 ? memory[value] : value;

  while (true) {
    const instruction = memory[ip];
    const opcode = instruction % 100;
    const mode1 = Math.floor(instruction / 100) % 10;
    const mode2 = Math.floor(instruction / 1000) % 10;

    switch (opcode) {
      case 1: {
        // add
        const a = getParam(mode1, memory[ip + 1]);
        const b = getParam(mode2, memory[ip + 2]);
        const dest = memory[ip + 3];
        memory[dest] = a + b;
        ip += 4;
        break;
      }
      case 2: {
        // multiply
        const a = getParam(mode1, memory[ip + 1]);
        const b = getParam(mode2, memory[ip + 2]);
        const dest = memory[ip + 3];
        memory[dest] = a * b;
        ip += 4;
        break;
      }
      case 3: {
        // input
        const dest = memory[ip + 1];
        memory[dest] = inputs[inputIndex++];
        ip += 2;
        break;
      }
      case 4: {
        // output
        const value = getParam(mode1, memory[ip + 1]);
        return value; // encerra ao produzir output
      }
      case 5: {
        // jump-if-true
        const cond = getParam(mode1, memory[ip + 1]);
        const target = getParam(mode2, memory[ip + 2]);
        ip = cond !== 0 ? target : ip + 3;
        break;
      }
      case 6: {
        // jump-if-false
        const cond = getParam(mode1, memory[ip + 1]);
        const target = getParam(mode2, memory[ip + 2]);
        ip = cond === 0 ? target : ip + 3;
        break;
      }
      case 7: {
        // less than
        const a = getParam(mode1, memory[ip + 1]);
        const b = getParam(mode2, memory[ip + 2]);
        const dest = memory[ip + 3];
        memory[dest] = a < b ? 1 : 0;
        ip += 4;
        break;
      }
      case 8: {
        // equals
        const a = getParam(mode1, memory[ip + 1]);
        const b = getParam(mode2, memory[ip + 2]);
        const dest = memory[ip + 3];
        memory[dest] = a === b ? 1 : 0;
        ip += 4;
        break;
      }
      case 99:
        throw new Error("Programa terminou sem produzir output");
      default:
        throw new Error(`Opcode inválido: ${opcode}`);
    }
  }
}

function permutations(arr: number[]): number[][] {
  if (arr.length === 0) return [[]];

  return arr.flatMap((value, index) => {
    const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return permutations(rest).map((p) => [value, ...p]);
  });
}

export function part1Run(program: Program) {
  const phaseSettings = permutations([0, 1, 2, 3, 4]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    let signal = 0;

    for (let i = 0; i < 5; i++) {
      signal = runIntcode(program, [phases[i], signal]);
    }

    maxSignal = Math.max(maxSignal, signal);
  }

  return maxSignal;
}
