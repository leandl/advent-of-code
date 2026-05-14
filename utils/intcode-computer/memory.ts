export class Memory {
  private memory = new Array();

  read(addr: number): number {
    // const value = this.memory[addr] ?? 0;
    // console.log(`READ memory[${addr}] = ${value}`);
    return this.memory[addr] ?? 0;
  }

  write(addr: number, value: number) {
    // console.log(`WRITE memory[${addr}] = ${value}`);
    this.memory[addr] = value;
  }

  load(program: number[]) {
    this.memory = [...program];
  }

  reset() {
    this.memory.fill(0);
  }
}
