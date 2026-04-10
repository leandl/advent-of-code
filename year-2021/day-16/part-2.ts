export function part2Run(hex: string) {
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

  function parsePacket(): number {
    read(3); // version (ignorado aqui)
    const type = read(3);

    // literal
    if (type === 4) {
      let valueBits = "";

      while (true) {
        const prefix = read(1);
        valueBits += bin.slice(pos, pos + 4);
        pos += 4;
        if (prefix === 0) break;
      }

      return parseInt(valueBits, 2);
    }

    // operador
    const lengthType = read(1);
    const values: number[] = [];

    if (lengthType === 0) {
      const totalLength = read(15);
      const target = pos + totalLength;

      while (pos < target) {
        values.push(parsePacket());
      }
    } else {
      const count = read(11);
      for (let i = 0; i < count; i++) {
        values.push(parsePacket());
      }
    }

    // aplica operação
    switch (type) {
      case 0:
        return values.reduce((a, b) => a + b, 0);
      case 1:
        return values.reduce((a, b) => a * b, 1);
      case 2:
        return Math.min(...values);
      case 3:
        return Math.max(...values);
      case 5:
        return values[0] > values[1] ? 1 : 0;
      case 6:
        return values[0] < values[1] ? 1 : 0;
      case 7:
        return values[0] === values[1] ? 1 : 0;
      default:
        throw new Error("Tipo inválido");
    }
  }

  return parsePacket();
}
