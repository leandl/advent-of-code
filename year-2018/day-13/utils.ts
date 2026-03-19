import { Grid, parseGrid } from "../../utils/parsers";

type Direction = "^" | "v" | "<" | ">";
type TurnDecision = "left" | "straight" | "right";

type Position = {
  x: number;
  y: number;
};

type Cart = {
  position: Position;
  direction: Direction;
  nextTurn: TurnDecision;
  hasCrashed: boolean;
};

type TrackGrid = Grid<string>;

// Movimento por direção
const DIRECTION_DELTAS: Record<Direction, Position> = {
  "^": { x: 0, y: -1 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
};

// Ordem de decisões em interseções
const TURN_SEQUENCE: TurnDecision[] = ["left", "straight", "right"];

// Rotação
const LEFT_ROTATION: Record<Direction, Direction> = {
  "^": "<",
  "<": "v",
  v: ">",
  ">": "^",
};

const RIGHT_ROTATION: Record<Direction, Direction> = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^",
};

function rotateLeft(direction: Direction): Direction {
  return LEFT_ROTATION[direction];
}

function rotateRight(direction: Direction): Direction {
  return RIGHT_ROTATION[direction];
}

export type TrackMap = {
  grid: TrackGrid;
  carts: Cart[];
};

export function parseTrackMap(lines: string[]): TrackMap {
  const grid: TrackGrid = parseGrid(lines);
  const carts: Cart[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];

      if ("^v<>".includes(cell)) {
        carts.push({
          position: { x, y },
          direction: cell as Direction,
          nextTurn: "left",
          hasCrashed: false,
        });

        // restaura trilho original
        grid[y][x] = cell === "^" || cell === "v" ? "|" : "-";
      }
    }
  }

  return { grid, carts };
}

export function applyIntersectionTurn(cart: Cart): void {
  if (cart.nextTurn === "left") {
    cart.direction = rotateLeft(cart.direction);
  } else if (cart.nextTurn === "right") {
    cart.direction = rotateRight(cart.direction);
  }

  // avança ciclo
  const currentIndex = TURN_SEQUENCE.indexOf(cart.nextTurn);
  cart.nextTurn = TURN_SEQUENCE[(currentIndex + 1) % 3];
}

// Aplica curva
export function applyCurveTurn(cart: Cart, trackPiece: string): void {
  const { direction } = cart;

  if (trackPiece === "/") {
    if (direction === "^" || direction === "v") {
      cart.direction = rotateRight(direction);
    } else {
      cart.direction = rotateLeft(direction);
    }
  }

  if (trackPiece === "\\") {
    if (direction === "^" || direction === "v") {
      cart.direction = rotateLeft(direction);
    } else {
      cart.direction = rotateRight(direction);
    }
  }
}

// Move carrinho
export function moveCart(cart: Cart): void {
  const delta = DIRECTION_DELTAS[cart.direction];
  cart.position.x += delta.x;
  cart.position.y += delta.y;
}

// Ordenação (reading order)
export function sortCartsByReadingOrder(carts: Cart[]): void {
  carts.sort(
    (a, b) => a.position.y - b.position.y || a.position.x - b.position.x,
  );
}

// Detecta colisão
export function findCollision(carts: Cart[], current: Cart): Position | null {
  for (const other of carts) {
    if (
      other !== current &&
      !other.hasCrashed &&
      other.position.x === current.position.x &&
      other.position.y === current.position.y
    ) {
      return { ...current.position };
    }
  }
  return null;
}
