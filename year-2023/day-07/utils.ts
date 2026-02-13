enum HandType {
  High = 1,
  OnePair,
  TwoPair,
  Three,
  FullHouse,
  Four,
  Five,
}

export type Hand = {
  cards: string;
  bid: number;
  type: HandType;
};

type Rules = {
  useJoker: boolean;
  cardOrder: string;
};

function classifyHand(cards: string, useJoker: boolean): HandType {
  const counts: Record<string, number> = {};
  let jokers = 0;

  for (const c of cards) {
    if (useJoker && c === "J") {
      jokers++;
    } else {
      counts[c] = (counts[c] ?? 0) + 1;
    }
  }

  // Todos Jokers
  if (useJoker && jokers === 5) {
    return HandType.Five;
  }

  // Pega as contagens
  const values = Object.values(counts);

  // Encontra maior grupo sem precisar ordenar
  let max = 0;
  let second = 0;

  for (const v of values) {
    if (v > max) {
      second = max;
      max = v;
    } else if (v > second) {
      second = v;
    }
  }

  // Adiciona jokers ao maior grupo
  max += jokers;

  if (max === 5) return HandType.Five;
  if (max === 4) return HandType.Four;
  if (max === 3 && second === 2) return HandType.FullHouse;
  if (max === 3) return HandType.Three;
  if (max === 2 && second === 2) return HandType.TwoPair;
  if (max === 2) return HandType.OnePair;

  return HandType.High;
}

export function buildStrengthMap(order: string): Record<string, number> {
  const map: Record<string, number> = {};
  for (let i = 0; i < order.length; i++) {
    map[order[i]] = i;
  }
  return map;
}

export function parseHands(lines: string[], rules: Rules): Hand[] {
  return lines.map((line, index) => {
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 2) {
      throw new Error(`Linha inválida na posição ${index + 1}: "${line}"`);
    }

    const [cards, bidStr] = parts;

    if (cards.length !== 5) {
      throw new Error(`Mão inválida na linha ${index + 1}: "${cards}"`);
    }

    const bid = Number(bidStr);
    if (Number.isNaN(bid)) {
      throw new Error(`Bid inválido na linha ${index + 1}: "${bidStr}"`);
    }

    return {
      cards,
      bid,
      type: classifyHand(cards, rules.useJoker),
    };
  });
}

export function compareHands(
  a: Hand,
  b: Hand,
  strengthMap: Record<string, number>,
): number {
  if (a.type !== b.type) {
    return a.type - b.type;
  }

  for (let i = 0; i < 5; i++) {
    const diff = strengthMap[a.cards[i]] - strengthMap[b.cards[i]];

    if (diff !== 0) return diff;
  }

  return 0;
}
