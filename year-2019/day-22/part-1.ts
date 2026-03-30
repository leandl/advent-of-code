import { ShuffleOp } from "./utils";

export function part1Run(ops: ShuffleOp[]) {
  const size = 10007;
  const sizeBig = BigInt(size);

  let deck = Array.from({ length: size }, (_, i) => i);

  for (const op of ops) {
    switch (op.type) {
      case "new_stack":
        deck.reverse();
        break;

      case "cut": {
        const cut = Number(((op.n % sizeBig) + sizeBig) % sizeBig);

        deck = deck.slice(cut).concat(deck.slice(0, cut));
        break;
      }

      case "increment": {
        const newDeck = new Array<number>(size);
        let pos = 0n;

        for (const card of deck) {
          newDeck[Number(pos)] = card;
          pos = (pos + op.n) % sizeBig;
        }

        deck = newDeck;
        break;
      }
    }
  }

  return deck.indexOf(2019).toString();
}
