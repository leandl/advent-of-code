class QueueNode<T> {
  constructor(
    public value: T,
    public next: QueueNode<T> | null = null,
  ) {}
}

export class Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private length = 0;

  enqueue(value: T): void {
    const node = new QueueNode(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const value = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;

    return value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}
