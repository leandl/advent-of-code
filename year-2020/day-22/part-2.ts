import { calculateScore, Deck } from "./utils";

type GameResult = {
  winner: 1 | 2;
  winnerDeck: number[];
};

function serialize(p1: number[], p2: number[]): string {
  return `${p1.join(",")}|${p2.join(",")}`;
}

function playRecursiveCombat(deck1: number[], deck2: number[]): GameResult {
  const p1 = [...deck1];
  const p2 = [...deck2];

  const seen = new Set<string>();

  while (p1.length > 0 && p2.length > 0) {
    // estado atual
    const state = serialize(p1, p2);

    if (seen.has(state)) {
      return { winner: 1, winnerDeck: p1 };
    }

    seen.add(state);

    const c1 = p1.shift()!;
    const c2 = p2.shift()!;

    let roundWinner: 1 | 2;

    // RECURSÃO
    if (p1.length >= c1 && p2.length >= c2) {
      const subGame = playRecursiveCombat(p1.slice(0, c1), p2.slice(0, c2));

      roundWinner = subGame.winner;
    } else {
      roundWinner = c1 > c2 ? 1 : 2;
    }

    // distribuir cartas
    if (roundWinner === 1) {
      p1.push(c1, c2);
    } else {
      p2.push(c2, c1);
    }
  }

  return p1.length > 0
    ? { winner: 1, winnerDeck: p1 }
    : { winner: 2, winnerDeck: p2 };
}

export function part2Run([deck1, deck2]: [Deck, Deck]) {
  const { winnerDeck } = playRecursiveCombat(deck1, deck2);

  return calculateScore(winnerDeck);
}
