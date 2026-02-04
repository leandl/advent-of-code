function getABAs(segment: string): string[] {
  const abas: string[] = [];

  for (let i = 0; i <= segment.length - 3; i++) {
    const a = segment[i];
    const b = segment[i + 1];
    const c = segment[i + 2];

    if (a === c && a !== b) {
      abas.push(a + b + c);
    }
  }

  return abas;
}

function supportsSSL(ip: string): boolean {
  const parts = ip.split(/[\[\]]/);

  const supernetABAs: string[] = [];
  const hypernets: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // fora dos colchetes
      supernetABAs.push(...getABAs(parts[i]));
    } else {
      // dentro dos colchetes
      hypernets.push(parts[i]);
    }
  }

  // para cada ABA, procura o BAB correspondente
  for (const aba of supernetABAs) {
    const bab = aba[1] + aba[0] + aba[1];

    if (hypernets.some((h) => h.includes(bab))) {
      return true;
    }
  }

  return false;
}

export function part2Run(lines: string[]) {
  let count = 0;

  for (const ip of lines) {
    if (supportsSSL(ip)) {
      count++;
    }
  }

  return count;
}
