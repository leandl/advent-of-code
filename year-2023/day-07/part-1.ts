import { compareHands, Hand } from "./utils";

export function part1Run(hands: Hand[], strengthMap: Record<string, number>) {
  hands.sort((a, b) => compareHands(a, b, strengthMap));

  return hands.reduce((sum, hand, index) => {
    const rank = index + 1;
    return sum + hand.bid * rank;
  }, 0);
}
