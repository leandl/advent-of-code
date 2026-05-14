import { Queue } from "../../../queue";

export class DefaultIO {
  private inputQueue = new Queue<number>();
  lastOutput: number | null = null;

  input(): number {
    const value = this.inputQueue.dequeue();

    if (value === undefined) {
      throw new Error("NO_INPUT");
    }

    return value;
  }

  output(value: number): void {
    this.lastOutput = value;
  }

  provideInput(value: number) {
    this.inputQueue.enqueue(value);
  }

  peekInput(): number | undefined {
    return this.inputQueue.peek();
  }
}
