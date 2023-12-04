export async function* readFileLineByLine(year: number, day: number) {
  const data = Bun.file(`./data/${year}/${day}/data.txt`);
  const dataStream = data.stream(64);
  const dataReader = dataStream.getReader();
  const decoder = new TextDecoder();

  let partialLine = "";
  while (true) {
    const { value, done } = await dataReader.read();
    if (done) {
      break;
    }

    const chunk = decoder.decode(value);
    const lines = (partialLine + chunk).split(/\r?\n/);

    partialLine = lines.pop() ?? "";

    for (const line of lines) {
      yield line;
    }
  }

  if (partialLine) {
    yield partialLine;
  }
}
