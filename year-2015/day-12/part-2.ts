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

  let result = 0;
  for (const key in data) {
    const curValue = data[key];

    if (curValue === "red") {
      return 0;
    }

    result += calcData(curValue);
  }

  return result;
}

export function part2Run(data: any) {
  return calcData(data);
}
