function calculateImageChecksum(
  imageData: string,
  imageWidth: number,
  imageHeight: number
): number {
  const pixelsPerLayer = imageWidth * imageHeight;
  const imageLayers: string[] = [];

  // Divide os dados da imagem em layers
  for (let offset = 0; offset < imageData.length; offset += pixelsPerLayer) {
    imageLayers.push(imageData.slice(offset, offset + pixelsPerLayer));
  }

  let layerWithFewestZeros = "";
  let fewestZeroCount = Infinity;

  // Encontra a layer com a menor quantidade de pixels '0'
  for (const layer of imageLayers) {
    const zeroCount = layer.split("").filter((pixel) => pixel === "0").length;

    if (zeroCount < fewestZeroCount) {
      fewestZeroCount = zeroCount;
      layerWithFewestZeros = layer;
    }
  }

  // Calcula o checksum: número de '1' * número de '2'
  const oneCount = layerWithFewestZeros
    .split("")
    .filter((pixel) => pixel === "1").length;

  const twoCount = layerWithFewestZeros
    .split("")
    .filter((pixel) => pixel === "2").length;

  return oneCount * twoCount;
}

export function part1Run(input: string) {
  return calculateImageChecksum(input, 25, 6);
}
