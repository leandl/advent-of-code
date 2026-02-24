import { StreamToken } from "./utils";

export function part1Run(stream: string) {
  let groupScoreTotal = 0;
  let groupNestingLevel = 0;
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
      continue;
    }

    if (token === StreamToken.GROUP_START) {
      groupNestingLevel += 1;
    }

    if (token === StreamToken.GROUP_END && groupNestingLevel > 0) {
      groupScoreTotal += groupNestingLevel;
      groupNestingLevel -= 1;
    }
  }

  return groupScoreTotal;
}
