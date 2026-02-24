import { StreamToken } from "./utils";

export function part2Run(stream: string) {
  let ignoredTotal = 0;

  let shouldSkipNextCharacter = false;
  let isInsideGarbageSection = false;

  for (const token of stream) {
    if (shouldSkipNextCharacter) {
      shouldSkipNextCharacter = false;
      continue;
    }

    if (token === StreamToken.IGNORED) {
      shouldSkipNextCharacter = true;
      continue;
    }

    if (token === StreamToken.GARBAGE_END && isInsideGarbageSection) {
      isInsideGarbageSection = false;
      continue;
    }

    if (token === StreamToken.GARBAGE_START && !isInsideGarbageSection) {
      isInsideGarbageSection = true;
      continue;
    }

    if (isInsideGarbageSection) {
      ignoredTotal += 1;
      continue;
    }
  }

  return ignoredTotal;
}
