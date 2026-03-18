export function getPowerLevel(x: number, y: number, serial: number): number {
  const rackId = x + 10;
  let power = rackId * y;
  power += serial;
  power *= rackId;

  const hundreds = Math.floor((power % 1000) / 100);
  return hundreds - 5;
}
