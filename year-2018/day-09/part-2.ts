import { GameConfig, play } from "./utils";

export function part2Run({ lastMarble, players }: GameConfig) {
  return play(players, lastMarble * 100);
}
