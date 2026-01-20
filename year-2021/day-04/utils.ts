type Marked = boolean[][];
type Board = number[][];
type BingoInput = {
  draws: number[];
  boards: Board[];
};

export function parseBingoInput(lines: string[]): BingoInput {
  // 1. Primeira linha: números sorteados
  const draws = lines[0].split(",").map(Number);

  const boards: Board[] = [];
  let currentBoard: number[][] = [];

  // 2. Começa a ler a partir da linha 2
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Linha vazia → separador de boards
    if (line === "") {
      if (currentBoard.length === 5) {
        boards.push(currentBoard);
        currentBoard = [];
      }
      continue;
    }

    // Linha com números do board
    const row = line
      .split(/\s+/) // lida com espaços múltiplos
      .map(Number);

    currentBoard.push(row);
  }

  // Último board (caso não termine com linha vazia)
  if (currentBoard.length === 5) {
    boards.push(currentBoard);
  }

  return { draws, boards };
}

export function createMarked(): Marked {
  return Array.from({ length: 5 }, () => Array(5).fill(false));
}

export function markNumber(board: Board, marked: Marked, value: number) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === value) {
        marked[i][j] = true;
      }
    }
  }
}

export function hasWon(marked: Marked): boolean {
  // linhas
  for (let i = 0; i < 5; i++) {
    if (marked[i].every(Boolean)) return true;
  }

  // colunas
  for (let j = 0; j < 5; j++) {
    let all = true;
    for (let i = 0; i < 5; i++) {
      if (!marked[i][j]) {
        all = false;
        break;
      }
    }
    if (all) return true;
  }

  return false;
}

export function sumUnmarked(board: Board, marked: Marked): number {
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!marked[i][j]) {
        sum += board[i][j];
      }
    }
  }

  return sum;
}
