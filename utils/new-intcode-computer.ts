enum Opcode {
  ADD = 1,
  MULTIPLY = 2,
  HALT = 99,
}

export class IntcodeComputer {
  private memory: number[];

  constructor(program: number[]) {
    this.memory = [...program];
  }

  run() {
    let instructionPointer = 0;
    let isHalted = false;

    while (!isHalted) {
      const opcode = this.memory[instructionPointer];

      const inputPosition1 = this.memory[instructionPointer + 1];
      const inputPosition2 = this.memory[instructionPointer + 2];
      const outputPosition = this.memory[instructionPointer + 3];

      switch (opcode) {
        case Opcode.HALT:
          isHalted = true;
          break;

        case Opcode.ADD:
          this.memory[outputPosition] =
            this.memory[inputPosition1] + this.memory[inputPosition2];
          break;

        case Opcode.MULTIPLY:
          this.memory[outputPosition] =
            this.memory[inputPosition1] * this.memory[inputPosition2];
          break;

        default:
          throw new Error(`Unknown opcode: ${opcode}`);
      }

      instructionPointer += 4;
    }

    return this.memory[0];
  }
}
