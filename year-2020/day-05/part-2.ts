function decodeSeat(pass: string): number {
  const binary = pass.replace(/F|L/g, "0").replace(/B|R/g, "1");

  return parseInt(binary, 2);
}

export function part2Run(passes: string[]) {
  const seatIds = passes.map(decodeSeat).sort((a, b) => a - b);

  for (let i = 1; i < seatIds.length; i++) {
    const previous = seatIds[i - 1];
    const current = seatIds[i];

    // Se existe um buraco de exatamente 1
    if (current !== previous + 1) {
      return previous + 1;
    }
  }

  return null;
}
