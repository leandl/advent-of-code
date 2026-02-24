export type GameConfig = {
  players: number;
  lastMarble: number;
};

export function parseGameConfig(line: string): GameConfig {
  const numbers = line.match(/\d+/g);
  if (!numbers) {
    throw new Error("Entrada inválida");
  }

  return {
    players: Number(numbers[0]),
    lastMarble: Number(numbers[1]),
  };
}

type Node = {
  value: number;
  next: Node | null;
  prev: Node | null;
};

export function play(players: number, lastMarble: number): number {
  const scores = new Array<number>(players).fill(0);

  let current: Node = {
    value: 0,
    next: null,
    prev: null,
  };

  current.next = current;
  current.prev = current;

  for (let marble = 1; marble <= lastMarble; marble++) {
    const player = (marble - 1) % players;

    if (marble % 23 === 0) {
      scores[player] += marble;

      for (let i = 0; i < 7; i++) {
        current = current.prev!;
      }

      scores[player] += current.value;

      current.prev!.next = current.next;
      current.next!.prev = current.prev;

      current = current.next!;
    } else {
      current = current.next!;

      const newNode: Node = {
        value: marble,
        next: current.next,
        prev: current,
      };

      current.next!.prev = newNode;
      current.next = newNode;

      current = newNode;
    }
  }

  return Math.max(...scores);
}
