const MOD = 20201227;
const SUBJECT = 7;

// descobre loop size via brute force
function findLoopSize(publicKey: number): number {
  let value = 1;
  let loop = 0;

  while (value !== publicKey) {
    value = (value * SUBJECT) % MOD;
    loop++;
  }

  return loop;
}

// faz a transformação
function transform(subject: number, loopSize: number): number {
  let value = 1;

  for (let i = 0; i < loopSize; i++) {
    value = (value * subject) % MOD;
  }

  return value;
}

export function part1Run(cardPublic: number, doorPublic: number) {
  const cardLoop = findLoopSize(cardPublic);

  // pode usar qualquer um dos dois
  return transform(doorPublic, cardLoop);
}
