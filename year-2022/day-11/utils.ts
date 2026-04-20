export type Monkey = {
  items: number[];
  operation: (old: number) => number;
  testDivisor: number;
  ifTrue: number;
  ifFalse: number;
  inspections: number;
};

export function parseMonkeys(input: string): Monkey[] {
  const blocks = input.trim().split("\n\n");

  return blocks.map((block) => {
    const lines = block.split("\n").map((l) => l.trim());

    // Starting items
    const items = lines[1]
      .replace("Starting items: ", "")
      .split(", ")
      .map(Number);

    // Operation
    const opStr = lines[2].replace("Operation: new = ", "");
    let operation: (old: number) => number;

    if (opStr === "old * old") {
      operation = (old) => old * old;
    } else if (opStr.includes("*")) {
      const n = Number(opStr.split("*")[1].trim());
      operation = (old) => old * n;
    } else if (opStr.includes("+")) {
      const n = Number(opStr.split("+")[1].trim());
      operation = (old) => old + n;
    } else {
      throw new Error("Unknown operation");
    }

    // Test
    const testDivisor = Number(lines[3].replace("Test: divisible by ", ""));

    const ifTrue = Number(lines[4].replace("If true: throw to monkey ", ""));

    const ifFalse = Number(lines[5].replace("If false: throw to monkey ", ""));

    return {
      items,
      operation,
      testDivisor,
      ifTrue,
      ifFalse,
      inspections: 0,
    };
  });
}

export function simulate(
  monkeys: Monkey[],
  rounds: number,
  worryReducer: (n: number) => number,
): number {
  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];

      while (monkey.items.length > 0) {
        let item = monkey.items.shift()!;

        monkey.inspections++;

        item = monkey.operation(item);

        // 👇 agora é flexível
        item = worryReducer(item);

        if (item % monkey.testDivisor === 0) {
          monkeys[monkey.ifTrue].items.push(item);
        } else {
          monkeys[monkey.ifFalse].items.push(item);
        }
      }
    }
  }

  const inspections = monkeys.map((m) => m.inspections).sort((a, b) => b - a);

  return inspections[0] * inspections[1];
}
