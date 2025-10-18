function calcData(data: any): number {
  if (typeof data === "number") {
    return data;
  }

  if (typeof data === "string") {
    return 0;
  }

  if (data instanceof Array) {
    return data.reduce((acc, cur) => acc + calcData(cur), 0);
  }

  return Object.entries(data).reduce(
    (acc, [_key, curValue]) => acc + calcData(curValue),
    0
  );
}

export function part1Run(data: any) {
  return calcData(data);
}
