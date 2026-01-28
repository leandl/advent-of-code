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

  private getParameter(mode: number, offset: number): number {
    const value = this.memory[this.ip + offset];
    if (mode === 0) {
      // position mode
      return this.memory[value];
    }
    // immediate mode
    return value;
  }

  run(): void {
    while (true) {
      const instruction = this.memory[this.ip];
      const opcode = instruction % 100;

      const mode1 = Math.floor(instruction / 100) % 10;
      const mode2 = Math.floor(instruction / 1000) % 10;
      // mode3 nunca é usado para leitura (parâmetro de escrita)

      switch (opcode) {
        case 1: {
          // ADD
          const a = this.getParameter(mode1, 1);
          const b = this.getParameter(mode2, 2);
          const dest = this.memory[this.ip + 3];
          this.memory[dest] = a + b;
          this.ip += 4;
          break;
        }

        case 2: {
          // MULTIPLY
          const a = this.getParameter(mode1, 1);
          const b = this.getParameter(mode2, 2);
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
          const value = this.getParameter(mode1, 1);
          this.output(value);
          this.ip += 2;
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

export function part1Run(program: number[]) {
  const outputs: number[] = [];
  const computer = new IntcodeComputer(
    program,
    () => 1, // input = 1 (air conditioner ID)
    (value) => outputs.push(value)
  );

  computer.run();

  return outputs[outputs.length - 1];
}
