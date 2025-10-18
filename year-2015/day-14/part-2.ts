import { parseDataReindeer, regexDataReindeer } from "./utils";

type ReindeerState = {
  type: "SPRINT" | "REST";
  countdown: number;
};

type Reindeer = {
  name: string;
  score: number;
  distance: number;
  data: {
    sprint: {
      kmBySecond: number;
      sprintTime: number;
    };
    restTime: number;
  };

  state: ReindeerState;
};

function createReindeer(
  reindeerName: string,
  reindeerSprintKM: number,
  reindeerSprintSeconds: number,
  reindeerRest: number
): Reindeer {
  return {
    name: reindeerName,
    score: 0,
    distance: 0,
    data: {
      sprint: {
        kmBySecond: reindeerSprintKM,
        sprintTime: reindeerSprintSeconds,
      },
      restTime: reindeerRest,
    },

    state: {
      type: "SPRINT",
      countdown: reindeerSprintSeconds,
    },
  };
}

function updateReindeerRun(reindeer: Reindeer) {
  if (reindeer.state.type === "SPRINT") {
    reindeer.distance += reindeer.data.sprint.kmBySecond;
  }

  reindeer.state.countdown -= 1;
  if (reindeer.state.countdown <= 0) {
    if (reindeer.state.type === "SPRINT") {
      reindeer.state.type = "REST";
      reindeer.state.countdown = reindeer.data.restTime;
    } else {
      reindeer.state.type = "SPRINT";
      reindeer.state.countdown = reindeer.data.sprint.sprintTime;
    }
  }
}

function getReindeerWithHighestScore(
  reindeers: Record<string, Reindeer>
): string {
  let maxScore = 0;
  let nameMaxScore: string;

  for (let reindeerName in reindeers) {
    const reindeer = reindeers[reindeerName];

    if (maxScore < reindeer.score) {
      maxScore = reindeer.score;
      nameMaxScore = reindeerName;
    }
  }

  return nameMaxScore!;
}

function getReindeerWithLongestDistance(
  reindeers: Record<string, Reindeer>
): string {
  let maxDistance = 0;
  let nameMaxDistance: string;

  for (let reindeerName in reindeers) {
    const reindeer = reindeers[reindeerName];
    if (maxDistance < reindeer.distance) {
      maxDistance = reindeer.distance;
      nameMaxDistance = reindeerName;
    }
  }

  return nameMaxDistance!;
}

export function addScoreForFirstPlace(reindeers: Record<string, Reindeer>) {
  const reindeerWithLongestDistanceName =
    getReindeerWithLongestDistance(reindeers);
  const longestDistance = reindeers[reindeerWithLongestDistanceName].distance;

  for (let reindeerName in reindeers) {
    const reindeer = reindeers[reindeerName];
    if (longestDistance === reindeer.distance) {
      reindeers[reindeerName].score += 1;
    }
  }
}

export function part2Run(lines: string[], raceTime: number) {
  const reindeers: Record<string, Reindeer> = {};
  for (const line of lines) {
    const match = regexDataReindeer.exec(line);
    if (match) {
      const [
        reindeerName,
        reindeerSprintKM,
        reindeerSprintSeconds,
        reindeerRest,
      ] = parseDataReindeer(match);

      reindeers[reindeerName] = createReindeer(
        reindeerName,
        reindeerSprintKM,
        reindeerSprintSeconds,
        reindeerRest
      );
    }
  }

  for (let _second = 0; _second < raceTime; _second++) {
    for (let reindeerName in reindeers) {
      const reindeer = reindeers[reindeerName];
      updateReindeerRun(reindeer);
    }

    addScoreForFirstPlace(reindeers);
  }

  const reindeerMaxScoreName = getReindeerWithHighestScore(reindeers);
  const maxScore = reindeers[reindeerMaxScoreName].score;

  return maxScore;
}
