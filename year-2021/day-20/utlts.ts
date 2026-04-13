export type TrenchMap = {
  algorithm: string;
  image: string[];
};

// -------------------- INPUT --------------------

export function parseTrenchMap(input: string): TrenchMap {
  const [algorithm, data] = input.replace(/\r/g, "").trim().split("\n\n");

  return {
    algorithm,
    image: data.split("\n"),
  };
}

// -------------------- GET --------------------

function get(
  y: number,
  x: number,
  image: string[],
  defaultChar: string,
): string {
  return image[y]?.[x] ?? defaultChar;
}

// -------------------- CONVOLUTION --------------------

function convolution({
  image,
  algorithm,
  defaultChar = ".",
}: {
  image: string[];
  algorithm: string;
  defaultChar?: string;
}): string[] {
  const result: string[] = [];

  for (let y = -1; y < image.length + 1; y++) {
    let row = "";

    for (let x = -1; x < image[0].length + 1; x++) {
      let bits = "";

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          bits += get(y + dy, x + dx, image, defaultChar) === "#" ? "1" : "0";
        }
      }

      const index = parseInt(bits, 2);
      row += algorithm[index];
    }

    result.push(row);
  }

  return result;
}

// -------------------- ENHANCEMENT ENGINE --------------------

export function enhance(
  image: string[],
  algorithm: string,
  steps: number,
): string[] {
  let defaultChar = ".";

  for (let i = 0; i < steps; i++) {
    image = convolution({ image, algorithm, defaultChar });

    // regra do infinito (ESSENCIAL)
    if (algorithm[0] === "#") {
      defaultChar = defaultChar === "." ? "#" : ".";
    }
  }

  return image;
}

// -------------------- COUNT --------------------

export function countLight(image: string[]): number {
  return image.join("").split("#").length - 1;
}
