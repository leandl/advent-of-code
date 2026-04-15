type Amphipod = "A" | "B" | "C" | "D";
type Cell = Amphipod | ".";

const ENERGY: Record<Amphipod, number> = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const ROOM_INDEX: Record<Amphipod, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

const ROOM_POS = [2, 4, 6, 8];
const HALLWAY_STOPS = [0, 1, 3, 5, 7, 9, 10];

export type State = {
  hallway: Cell[];
  rooms: Cell[][];
};

// ---------------- PARSE ----------------

export function parseState(lines: string[]): State {
  const hallway = lines[1].slice(1, -1).split("") as Cell[];

  const roomCols = [3, 5, 7, 9];
  const roomLines = lines.slice(2, lines.length - 1);

  const rooms = roomCols.map((col) =>
    roomLines.map((line) => line[col] as Cell),
  );

  return { hallway, rooms };
}

export function unfoldInput(lines: string[]): string[] {
  return [
    lines[0],
    lines[1],
    lines[2],
    "  #D#C#B#A#",
    "  #D#B#A#C#",
    lines[3],
    lines[4],
  ];
}

// ---------------- SERIALIZE ----------------

function serialize(state: State): string {
  let s = "";

  for (let i = 0; i < 11; i++) s += state.hallway[i];

  for (let r = 0; r < 4; r++) {
    const room = state.rooms[r];
    for (let d = 0; d < room.length; d++) {
      s += room[d];
    }
  }

  return s;
}

// ---------------- GOAL ----------------

function isGoal(state: State): boolean {
  for (let r = 0; r < 4; r++) {
    const expected = "ABCD"[r];
    const room = state.rooms[r];
    for (let d = 0; d < room.length; d++) {
      if (room[d] !== expected) return false;
    }
  }
  return true;
}

// ---------------- PATH ----------------

function pathClear(hallway: Cell[], from: number, to: number): boolean {
  if (from < to) {
    for (let i = from + 1; i <= to; i++) {
      if (hallway[i] !== ".") return false;
    }
  } else {
    for (let i = from - 1; i >= to; i--) {
      if (hallway[i] !== ".") return false;
    }
  }
  return true;
}

// ---------------- MOVES ----------------

function getMoves(state: State): [State, number][] {
  const moves: [State, number][] = [];

  // hallway -> room
  for (let i = 0; i < 11; i++) {
    const a = state.hallway[i];
    if (a === ".") continue;

    const roomIdx = ROOM_INDEX[a];
    const room = state.rooms[roomIdx];
    const pos = ROOM_POS[roomIdx];

    if (!pathClear(state.hallway, i, pos)) continue;

    let valid = true;
    for (let d = 0; d < room.length; d++) {
      if (room[d] !== "." && room[d] !== a) {
        valid = false;
        break;
      }
    }
    if (!valid) continue;

    let roomDepth = -1;
    for (let d = room.length - 1; d >= 0; d--) {
      if (room[d] === ".") {
        roomDepth = d;
        break;
      }
    }
    if (roomDepth === -1) continue;

    const steps = Math.abs(i - pos) + roomDepth + 1;
    const cost = steps * ENERGY[a];

    const next: State = {
      hallway: state.hallway.slice(),
      rooms: [
        state.rooms[0].slice(),
        state.rooms[1].slice(),
        state.rooms[2].slice(),
        state.rooms[3].slice(),
      ],
    };

    next.hallway[i] = ".";
    next.rooms[roomIdx][roomDepth] = a;

    moves.push([next, cost]);
  }

  // room -> hallway
  for (let r = 0; r < 4; r++) {
    const room = state.rooms[r];
    const pos = ROOM_POS[r];

    let depth = -1;
    for (let d = 0; d < room.length; d++) {
      if (room[d] !== ".") {
        depth = d;
        break;
      }
    }
    if (depth === -1) continue;

    const a = room[depth] as Amphipod;

    let ok = true;
    for (let d = depth; d < room.length; d++) {
      if (room[d] !== a) {
        ok = false;
        break;
      }
    }
    if (ok && ROOM_INDEX[a] === r) continue;

    for (const target of HALLWAY_STOPS) {
      if (!pathClear(state.hallway, pos, target)) continue;

      const steps = Math.abs(pos - target) + depth + 1;
      const cost = steps * ENERGY[a];

      const next: State = {
        hallway: state.hallway.slice(),
        rooms: [
          state.rooms[0].slice(),
          state.rooms[1].slice(),
          state.rooms[2].slice(),
          state.rooms[3].slice(),
        ],
      };

      next.hallway[target] = a;
      next.rooms[r][depth] = ".";

      moves.push([next, cost]);
    }
  }

  return moves;
}

// ---------------- HEURISTIC (A*) ----------------

function heuristic(state: State): number {
  let h = 0;

  for (let i = 0; i < 11; i++) {
    const a = state.hallway[i];
    if (a === ".") continue;

    const target = ROOM_POS[ROOM_INDEX[a]];
    h += (Math.abs(i - target) + 1) * ENERGY[a];
  }

  return h;
}

// ---------------- PRIORITY QUEUE ----------------

class PriorityQueue<T> {
  private data: [number, T][] = [];

  push(priority: number, item: T) {
    this.data.push([priority, item]);
    this.up(this.data.length - 1);
  }

  pop(): [number, T] | undefined {
    if (this.data.length === 0) return;

    const top = this.data[0];
    const end = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = end;
      this.down(0);
    }

    return top;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  private up(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p][0] <= this.data[i][0]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private down(i: number) {
    const n = this.data.length;
    while (true) {
      let l = i * 2 + 1;
      let r = i * 2 + 2;
      let smallest = i;

      if (l < n && this.data[l][0] < this.data[smallest][0]) smallest = l;
      if (r < n && this.data[r][0] < this.data[smallest][0]) smallest = r;

      if (smallest === i) break;

      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

// ---------------- SOLVER ----------------

export function findMinimumEnergy(initial: State): number {
  const pq = new PriorityQueue<State>();
  const dist = new Map<string, number>();

  pq.push(0, initial);
  dist.set(serialize(initial), 0);

  while (!pq.isEmpty()) {
    const [priority, state] = pq.pop()!;
    const key = serialize(state);
    const cost = dist.get(key)!;

    if (isGoal(state)) return cost;

    for (const [next, moveCost] of getMoves(state)) {
      const newCost = cost + moveCost;
      const k = serialize(next);

      const prev = dist.get(k);
      if (prev === undefined || newCost < prev) {
        dist.set(k, newCost);
        pq.push(newCost + heuristic(next), next);
      }
    }
  }

  return -1;
}
