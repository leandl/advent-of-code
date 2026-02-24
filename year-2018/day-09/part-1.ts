import { GameConfig, play } from "./utils";

export function part1Run({ lastMarble, players }: GameConfig) {
  return play(players, lastMarble);
}
