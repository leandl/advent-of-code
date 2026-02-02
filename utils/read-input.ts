import path from "node:path";
import { fileURLToPath } from "node:url";

function getInputFilePath(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
  extension: string = ".txt"
) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    __dirname,
    "..",
    dirYear,
    dirDay,
    `${filename}${extension}`
  );
  return filePath;
}

export async function readInputContent(
  dirYear: string,
  dirDay: string,
  filename: string = "data"
): Promise<string> {
  const filePath = getInputFilePath(dirYear, dirDay, filename);
  const file = Bun.file(filePath);
  const dataText = await file.text();
  return dataText;
}

export async function* readInputLineByLine(
  dirYear: string,
  dirDay: string,
  filename: string = "data"
) {
  const filePath = getInputFilePath(dirYear, dirDay, filename);
  const file = Bun.file(filePath);
  const dataStream = file.stream(64);
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

export async function readInputJSON(
  dirYear: string,
  dirDay: string,
  filename: string = "data"
): Promise<any> {
  const filePath = getInputFilePath(dirYear, dirDay, filename, ".json");
  const file = Bun.file(filePath);
  const dataText = await file.text();
  return JSON.parse(dataText);
}

export async function readInputLines(
  dirYear: string,
  dirDay: string,
  filename: string = "data"
): Promise<string[]> {
  const dataText = await readInputContent(dirYear, dirDay, filename);
  const lines = dataText.split("\n");
  return lines;
}
