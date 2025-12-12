// Grade bidimensional que descreve uma forma de presente
type GiftShapeGrid = string[][];

// Lista de quantidades de presentes por índice de forma
type GiftQuantityByShape = number[];

// Dimensões de uma região sob a árvore
type TreeRegionSize = {
  width: number;
  height: number;
};

// Requisito completo de uma região: tamanho + presentes necessários
type TreeRegionRequest = {
  regionSize: TreeRegionSize;
  requiredGifts: GiftQuantityByShape;
};

type RegionOccupancyGrid = boolean[][];

// Entrada completa do puzzle do Elfo
type ElfPuzzleInput = {
  giftShapeGrids: GiftShapeGrid[];
  treeRegionRequests: TreeRegionRequest[];
};

export function parseElfPuzzle(lines: string[]): ElfPuzzleInput {
  const sanitizedLines = lines.map((line) => line.trim()).filter(Boolean);

  const giftShapeGrids: GiftShapeGrid[] = [];
  const treeRegionRequests: TreeRegionRequest[] = [];

  let lineCursor = 0;

  while (lineCursor < sanitizedLines.length) {
    const line = sanitizedLines[lineCursor];

    // -------------------------
    // SECTION 1: Gift shape definitions (ex: "3:")
    // -------------------------
    if (/^\d+:$/.test(line)) {
      lineCursor++;

      const shapeGrid: GiftShapeGrid = [];

      while (
        lineCursor < sanitizedLines.length &&
        !/^\d+:$/.test(sanitizedLines[lineCursor]) &&
        !/^\d+x\d+:/.test(sanitizedLines[lineCursor])
      ) {
        shapeGrid.push(sanitizedLines[lineCursor].split(""));
        lineCursor++;
      }

      giftShapeGrids.push(shapeGrid);
      continue;
    }

    // -------------------------
    // SECTION 2: Tree region requests (ex: "12x5: 1 0 1 0 3 2")
    // -------------------------
    if (/^\d+x\d+:/.test(line)) {
      const [regionSizeToken, giftQuantityToken] = line.split(":");

      const [widthToken, heightToken] = regionSizeToken.split("x") as [
        string,
        string
      ];

      treeRegionRequests.push({
        regionSize: {
          width: Number(widthToken),
          height: Number(heightToken),
        },
        requiredGifts: giftQuantityToken.trim().split(/\s+/).map(Number),
      });
    }

    lineCursor++;
  }

  return {
    giftShapeGrids,
    treeRegionRequests,
  };
}

function createEmptyRegion(width: number, height: number): RegionOccupancyGrid {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );
}

function calculateShapeArea(shape: GiftShapeGrid): number {
  return shape.flat().filter((c) => c === "#").length;
}

function flipHorizontal(shape: GiftShapeGrid): GiftShapeGrid {
  return shape.map((row) => [...row].reverse());
}

function rotate90(shape: GiftShapeGrid): GiftShapeGrid {
  const h = shape.length;
  const w = shape[0].length;

  return Array.from({ length: w }, (_, x) =>
    Array.from({ length: h }, (_, y) => shape[h - 1 - y][x])
  );
}

function normalizeShape(shape: GiftShapeGrid): GiftShapeGrid {
  let rows = shape;
  let cols = shape[0].length;

  while (rows.length && rows[0].every((c) => c === ".")) rows = rows.slice(1);
  while (rows.length && rows[rows.length - 1].every((c) => c === "."))
    rows = rows.slice(0, -1);

  while (rows.length && rows.every((row) => row[0] === ".")) {
    rows = rows.map((row) => row.slice(1));
    cols--;
  }

  while (rows.length && rows.every((row) => row[cols - 1] === ".")) {
    rows = rows.map((row) => row.slice(0, -1));
    cols--;
  }

  return rows;
}

function generateAllVariants(shape: GiftShapeGrid): GiftShapeGrid[] {
  const variants: GiftShapeGrid[] = [];
  let current = shape;

  for (let r = 0; r < 4; r++) {
    const normalized = normalizeShape(current);
    variants.push(normalized);
    variants.push(normalizeShape(flipHorizontal(normalized)));
    current = rotate90(current);
  }

  const seen = new Set<string>();
  return variants.filter((v) => {
    const key = JSON.stringify(v);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function canPlaceGift(
  region: RegionOccupancyGrid,
  shape: GiftShapeGrid,
  offsetX: number,
  offsetY: number
): boolean {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] === "#") {
        const ry = offsetY + y;
        const rx = offsetX + x;

        if (
          ry < 0 ||
          rx < 0 ||
          ry >= region.length ||
          rx >= region[0].length ||
          region[ry][rx]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function placeGift(
  region: RegionOccupancyGrid,
  shape: GiftShapeGrid,
  offsetX: number,
  offsetY: number,
  value: boolean
): void {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] === "#") {
        region[offsetY + y][offsetX + x] = value;
      }
    }
  }
}

function canFitAllGiftsDFS(
  region: RegionOccupancyGrid,
  gifts: GiftShapeGrid[][]
): boolean {
  if (gifts.length === 0) return true;

  const [currentVariants, ...remaining] = gifts;

  for (const variant of currentVariants) {
    for (let y = 0; y < region.length; y++) {
      for (let x = 0; x < region[0].length; x++) {
        if (canPlaceGift(region, variant, x, y)) {
          placeGift(region, variant, x, y, true);

          if (canFitAllGiftsDFS(region, remaining)) {
            return true;
          }

          placeGift(region, variant, x, y, false);
        }
      }
    }
  }

  return false;
}

export function canRegionFitAllGifts(
  regionRequest: TreeRegionRequest,
  giftShapeCatalog: GiftShapeGrid[]
): boolean {
  const { width, height } = regionRequest.regionSize;
  const { requiredGifts } = regionRequest;

  const totalArea = requiredGifts.reduce(
    (sum, qty, id) => sum + qty * calculateShapeArea(giftShapeCatalog[id]),
    0
  );

  if (totalArea > width * height) return false;

  const region = createEmptyRegion(width, height);

  const giftsToPlace: GiftShapeGrid[][] = [];

  requiredGifts.forEach((qty, id) => {
    const variants = generateAllVariants(giftShapeCatalog[id]);
    for (let i = 0; i < qty; i++) {
      giftsToPlace.push(variants);
    }
  });

  // heurística: maiores primeiro
  giftsToPlace.sort(
    (a, b) => calculateShapeArea(b[0]) - calculateShapeArea(a[0])
  );

  return canFitAllGiftsDFS(region, giftsToPlace);
}
