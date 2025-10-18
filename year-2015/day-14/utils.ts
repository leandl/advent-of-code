// Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
export const regexDataReindeer =
  /(^.*?) can fly (.*?) km\/s for (.*?) seconds, but then must rest for (.*?) seconds./;

export function parseDataReindeer(
  match: RegExpExecArray
): [string, number, number, number] {
  return [match[1], Number(match[2]), Number(match[3]), Number(match[4])] as [
    string,
    number,
    number,
    number
  ];
}
