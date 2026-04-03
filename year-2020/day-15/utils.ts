export function rambunctiousRecitation(
  startingNumbers: number[],
  targetTurn: number,
): number {
  const lastSeen = new Map<number, number>();

  for (let i = 0; i < startingNumbers.length - 1; i++) {
    lastSeen.set(startingNumbers[i], i + 1);
  }

  let lastNumber = startingNumbers[startingNumbers.length - 1];

  for (let turn = startingNumbers.length + 1; turn <= targetTurn; turn++) {
    let nextNumber: number;

    if (lastSeen.has(lastNumber)) {
      nextNumber = turn - 1 - lastSeen.get(lastNumber)!;
    } else {
      nextNumber = 0;
    }

    lastSeen.set(lastNumber, turn - 1);

    lastNumber = nextNumber;
  }

  return lastNumber;
}
