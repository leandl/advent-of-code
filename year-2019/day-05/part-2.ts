type InputProvider = () => number;
type OutputHandler = (value: number) => void;

class IntcodeComputer {
  private memory: number[];
  private ip = 0; // instruction pointer

  constructor(
    program: number[],
    private input: InputProvider,
    private output: OutputHandler
  ) {
    this.memory = [...program];
  }

  private getParam(mode: number, offset: number): number {
    const value = this.memory[this.ip + offset];
    return mode === 0 ? this.memory[value] : value;
  }

  run(): void {
    while (true) {
      const instruction = this.memory[this.ip];
      const opcode = instruction % 100;

      const mode1 = Math.floor(instruction / 100) % 10;
      const mode2 = Math.floor(instruction / 1000) % 10;
      // mode3 nunca é usado para leitura

      switch (opcode) {
        case 1: {
          // ADD
          const a = this.getParam(mode1, 1);
          const b = this.getParam(mode2, 2);
          const dest = this.memory[this.ip + 3];
          this.memory[dest] = a + b;
          this.ip += 4;
          break;
        }

        case 2: {
          // MULTIPLY
          const a = this.getParam(mode1, 1);
          const b = this.getParam(mode2, 2);
          const dest = this.memory[this.ip + 3];
          this.memory[dest] = a * b;
          this.ip += 4;
          break;
        }

        case 3: {
          // INPUT
          const dest = this.memory[this.ip + 1];
          this.memory[dest] = this.input();
          this.ip += 2;
          break;
        }

        case 4: {
          // OUTPUT
          const value = this.getParam(mode1, 1);
          this.output(value);
          this.ip += 2;
          break;
        }

        case 5: {
          // JUMP-IF-TRUE
          const test = this.getParam(mode1, 1);
          const target = this.getParam(mode2, 2);
          this.ip = test !== 0 ? target : this.ip + 3;
          break;
        }

        case 6: {
          // JUMP-IF-FALSE
          const test = this.getParam(mode1, 1);
          const target = this.getParam(mode2, 2);
          this.ip = test === 0 ? target : this.ip + 3;
          break;
        }

        case 7: {
          // LESS THAN
          const a = this.getParam(mode1, 1);
          const b = this.getParam(mode2, 2);
          const dest = this.memory[this.ip + 3];
          this.memory[dest] = a < b ? 1 : 0;
          this.ip += 4;
          break;
        }

        case 8: {
          // EQUALS
          const a = this.getParam(mode1, 1);
          const b = this.getParam(mode2, 2);
          const dest = this.memory[this.ip + 3];
          this.memory[dest] = a === b ? 1 : 0;
          this.ip += 4;
          break;
        }

        case 99: // HALT
          return;

        default:
          throw new Error(`Unknown opcode ${opcode} at position ${this.ip}`);
      }
    }
  }
}

export function part2Run(program: number[]) {
  let diagnosticCode = 0;

  const computer = new IntcodeComputer(
    program,
    () => 5, // system ID do thermal radiator controller
    (value) => {
      diagnosticCode = value;
    }
  );

  computer.run();

  return diagnosticCode;
}
