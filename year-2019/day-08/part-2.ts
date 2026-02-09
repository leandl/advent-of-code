function decodeImage(
  imageData: string,
  imageWidth: number,
  imageHeight: number
): string[] {
  const pixelsPerLayer = imageWidth * imageHeight;
  const layers: string[] = [];

  // Divide em layers
  for (let offset = 0; offset < imageData.length; offset += pixelsPerLayer) {
    layers.push(imageData.slice(offset, offset + pixelsPerLayer));
  }

  // Pixels finais (começam como transparentes)
  const finalPixels = Array(pixelsPerLayer).fill("2");

  // Resolve cada pixel
  for (let pixelIndex = 0; pixelIndex < pixelsPerLayer; pixelIndex++) {
    for (const layer of layers) {
      const pixel = layer[pixelIndex];
      if (pixel !== "2") {
        finalPixels[pixelIndex] = pixel;
        break;
      }
    }
  }

  // Converte para linhas da imagem
  const renderedImage: string[] = [];
  for (let row = 0; row < imageHeight; row++) {
    const start = row * imageWidth;
    const end = start + imageWidth;
    renderedImage.push(finalPixels.slice(start, end).join(""));
  }

  return renderedImage;
}

function renderImage(image: string[]): string {
  let result = "";
  for (const row of image) {
    const rowString = row.replace(/0/g, " ").replace(/1/g, "█");
    result += "\n" + rowString;
  }

  return result;
}

export function part2Run(input: string) {
  const image = decodeImage(input, 25, 6);
  return renderImage(image);
}
