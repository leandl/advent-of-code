export class MinHeap<T> {
  private data: T[] = [];
  constructor(private cmp: (a: T, b: T) => number) {}

  push(v: T) {
    this.data.push(v);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  get length() {
    return this.data.length;
  }

  private bubbleUp(i: number) {
    const a = this.data;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(a[i], a[p]) >= 0) break;
      [a[i], a[p]] = [a[p], a[i]];
      i = p;
    }
  }

  private bubbleDown(i: number) {
    const a = this.data;
    const n = a.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.cmp(a[l], a[smallest]) < 0) smallest = l;
      if (r < n && this.cmp(a[r], a[smallest]) < 0) smallest = r;
      if (smallest === i) break;

      [a[i], a[smallest]] = [a[smallest], a[i]];
      i = smallest;
    }
  }
}
