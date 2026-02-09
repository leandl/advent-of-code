import { Program } from "./utils";

class IntcodeComputer {
  memory: number[];
  ip = 0;
  inputs: number[] = [];
  halted = false;

  constructor(program: number[]) {
    this.memory = [...program];
  }

  addInput(value: number) {
    this.inputs.push(value);
  }

  private getParam(mode: number, value: number): number {
    return mode === 0 ? this.memory[value] : value;
  }

  runUntilOutput(): number | null {
    while (true) {
      const instruction = this.memory[this.ip];
      const opcode = instruction % 100;
      const mode1 = Math.floor(instruction / 100) % 10;
      const mode2 = Math.floor(instruction / 1000) % 10;

      switch (opcode) {
        case 1: {
          const a = this.getParam(mode1, this.memory[this.ip + 1]);
          const b = this.getParam(mode2, this.memory[this.ip + 2]);
          this.memory[this.memory[this.ip + 3]] = a + b;
          this.ip += 4;
          break;
        }
        case 2: {
          const a = this.getParam(mode1, this.memory[this.ip + 1]);
          const b = this.getParam(mode2, this.memory[this.ip + 2]);
          this.memory[this.memory[this.ip + 3]] = a * b;
          this.ip += 4;
          break;
        }
        case 3: {
          if (this.inputs.length === 0) return null;
          this.memory[this.memory[this.ip + 1]] = this.inputs.shift()!;
          this.ip += 2;
          break;
        }
        case 4: {
          const output = this.getParam(mode1, this.memory[this.ip + 1]);
          this.ip += 2;
          return output;
        }
        case 5: {
          const cond = this.getParam(mode1, this.memory[this.ip + 1]);
          const target = this.getParam(mode2, this.memory[this.ip + 2]);
          this.ip = cond !== 0 ? target : this.ip + 3;
          break;
        }
        case 6: {
          const cond = this.getParam(mode1, this.memory[this.ip + 1]);
          const target = this.getParam(mode2, this.memory[this.ip + 2]);
          this.ip = cond === 0 ? target : this.ip + 3;
          break;
        }
        case 7: {
          const a = this.getParam(mode1, this.memory[this.ip + 1]);
          const b = this.getParam(mode2, this.memory[this.ip + 2]);
          this.memory[this.memory[this.ip + 3]] = a < b ? 1 : 0;
          this.ip += 4;
          break;
        }
        case 8: {
          const a = this.getParam(mode1, this.memory[this.ip + 1]);
          const b = this.getParam(mode2, this.memory[this.ip + 2]);
          this.memory[this.memory[this.ip + 3]] = a === b ? 1 : 0;
          this.ip += 4;
          break;
        }
        case 99:
          this.halted = true;
          return null;
        default:
          throw new Error(`Opcode inválido: ${opcode}`);
      }
    }
  }
}

function permutations(arr: number[]): number[][] {
  if (arr.length === 0) return [[]];
  return arr.flatMap((v, i) =>
    permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [
      v,
      ...p,
    ])
  );
}

export function part2Run(program: Program) {
  const phaseSettings = permutations([5, 6, 7, 8, 9]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    const amps = phases.map(() => new IntcodeComputer(program));

    // fase inicial
    for (let i = 0; i < 5; i++) {
      amps[i].addInput(phases[i]);
    }

    let signal = 0;
    let lastOutput = 0;

    while (!amps[4].halted) {
      for (let i = 0; i < 5; i++) {
        amps[i].addInput(signal);
        const output = amps[i].runUntilOutput();
        if (output !== null) {
          signal = output;
          if (i === 4) lastOutput = output;
        }
      }
    }

    maxSignal = Math.max(maxSignal, lastOutput);
  }

  return maxSignal;
}
