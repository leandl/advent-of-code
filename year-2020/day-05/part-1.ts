function decodeSeat(pass: string): number {
  // Primeiros 7 caracteres → linha
  const rowBinary = pass.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1");

  // Últimos 3 caracteres → coluna
  const colBinary = pass.slice(7).replace(/L/g, "0").replace(/R/g, "1");

  const row = parseInt(rowBinary, 2);
  const col = parseInt(colBinary, 2);
  const seatId = row * 8 + col;

  return seatId;
}

export function part1Run(passes: string[]) {
  let maxSeatId = 0;

  for (const pass of passes) {
    const seatId = decodeSeat(pass);
    if (seatId > maxSeatId) {
      maxSeatId = seatId;
    }
  }

  return maxSeatId;
}
