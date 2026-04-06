export type Deck = number[];

export function parseDecks(input: string): [Deck, Deck] {
  const [p1, p2] = input.split("\n\n");

  const deck1 = p1.split("\n").slice(1).map(Number);
  const deck2 = p2.split("\n").slice(1).map(Number);

  return [deck1, deck2];
}

export function calculateScore(deck: Deck): number {
  let score = 0;

  for (let i = 0; i < deck.length; i++) {
    const multiplier = deck.length - i;
    score += deck[i] * multiplier;
  }

  return score;
}
