type Cube = [number, string];
export type Reveal = Cube[];
type ParsedGame = [number, Reveal[]];

function parseInputPuzzleLine(line: string): ParsedGame {
  // "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue"
  const [gamePart, revealsPart] = line.split(":");

  const gameId = Number(gamePart.replace("Game", "").trim());

  const reveals: Reveal[] = revealsPart.split(";").map((reveal) =>
    reveal.split(",").map((cube) => {
      const [count, color] = cube.trim().split(" ");
      return [Number(count), color] as Cube;
    })
  );

  return [gameId, reveals];
}

export function parseInputPuzzle(lines: string[]): ParsedGame[] {
  return lines.map(parseInputPuzzleLine);
}
