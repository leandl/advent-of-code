export class Memory {
  private memory = new Uint8Array(0x10000); // 64KB

  read(addr: number): number {
    return this.memory[addr];
  }

  write(addr: number, value: number) {
    this.memory[addr] = value;
  }

  load(program: number[], startAddress: number = 0) {
    this.memory.set(program, startAddress);
  }

  reset() {
    this.memory.fill(0);
  }
}
