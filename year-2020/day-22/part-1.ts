import { calculateScore, Deck } from "./utils";

function playCombat(deck1: Deck, deck2: Deck): Deck {
  const p1 = [...deck1];
  const p2 = [...deck2];

  while (p1.length > 0 && p2.length > 0) {
    const c1 = p1.shift()!;
    const c2 = p2.shift()!;

    if (c1 > c2) {
      p1.push(c1, c2);
    } else {
      p2.push(c2, c1);
    }
  }

  return p1.length > 0 ? p1 : p2;
}

export function part1Run([deck1, deck2]: [Deck, Deck]) {
  const winningDeck = playCombat(deck1, deck2);

  return calculateScore(winningDeck);
}
