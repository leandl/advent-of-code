function hasABBA(segment: string): boolean {
  for (let i = 0; i <= segment.length - 4; i++) {
    const a = segment[i];
    const b = segment[i + 1];
    const c = segment[i + 2];
    const d = segment[i + 3];

    if (a !== b && a === d && b === c) {
      return true;
    }
  }
  return false;
}

function supportsTLS(ip: string): boolean {
  const parts = ip.split(/[\[\]]/);

  let hasAbbaOutside = false;

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (hasABBA(parts[i])) {
        hasAbbaOutside = true;
      }
    } else {
      if (hasABBA(parts[i])) {
        return false;
      }
    }
  }

  return hasAbbaOutside;
}

export function part1Run(lines: string[]) {
  let count = 0;

  for (const ip of lines) {
    if (supportsTLS(ip)) {
      count += 1;
    }
  }

  return count;
}
