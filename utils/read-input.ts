import path from "node:path";
import { fileURLToPath } from "node:url";

function getInputFilePath(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
  extension: string = ".txt",
) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, "..", dirYear, dirDay, `${filename}${extension}`);
}

export async function readInputContent(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
): Promise<string> {
  const filePath = getInputFilePath(dirYear, dirDay, filename);
  return await Bun.file(filePath).text();
}

export async function* readInputLineByLine(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
): AsyncGenerator<string> {
  const filePath = getInputFilePath(dirYear, dirDay, filename);

  const file = Bun.file(filePath);
  const stream = file.stream(); // <- sem buffer fixo
  const reader = stream.getReader();

  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value);

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      yield line;
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
}

export async function readInputJSON<T = unknown>(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
): Promise<T> {
  const filePath = getInputFilePath(dirYear, dirDay, filename, ".json");
  return JSON.parse(await Bun.file(filePath).text());
}

export async function readInputLines(
  dirYear: string,
  dirDay: string,
  filename: string = "data",
): Promise<string[]> {
  const text = await readInputContent(dirYear, dirDay, filename);
  return text.split(/\r?\n/);
}
