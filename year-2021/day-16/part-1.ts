export function part1Run(hex: string) {
  const bin = hex
    .split("")
    .map((c) => parseInt(c, 16).toString(2).padStart(4, "0"))
    .join("");

  let pos = 0;

  const read = (n: number): number => {
    const val = parseInt(bin.slice(pos, pos + n), 2);
    pos += n;
    return val;
  };

  let versionSum = 0;

  function parsePacket(): void {
    const version = read(3);
    const type = read(3);

    versionSum += version;

    if (type === 4) {
      // literal
      while (true) {
        const prefix = read(1);
        read(4); // ignora valor
        if (prefix === 0) break;
      }
    } else {
      // operador
      const lengthType = read(1);

      if (lengthType === 0) {
        const totalLength = read(15);
        const target = pos + totalLength;

        while (pos < target) {
          parsePacket();
        }
      } else {
        const count = read(11);
        for (let i = 0; i < count; i++) {
          parsePacket();
        }
      }
    }
  }

  parsePacket();

  return versionSum;
}
