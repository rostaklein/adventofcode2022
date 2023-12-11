import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("06");

class Race {
  constructor(public time: number, public distance: number) {}

  private getPossibleOptions() {
    const options: { traveledDistance: number; holdFor: number }[] = [];
    let holdFor = 0;

    while (holdFor < this.time) {
      const remainingTime = this.time - holdFor;
      options.push({
        traveledDistance: remainingTime * holdFor,
        holdFor,
      });
      holdFor++;
    }

    return options;
  }

  public getBestOptions() {
    return this.getPossibleOptions().filter(
      (o) => o.traveledDistance > this.distance
    );
  }
}

const solve = () => {
  const times = input[0].split(" ").map(Number).filter(Boolean);
  const distances = input[1].split(" ").map(Number).filter(Boolean);

  const races = times.map((time, i) => new Race(time, distances[i]));

  return races
    .map((race) => race.getBestOptions())
    .reduce((acc, curr) => {
      return acc * curr.length;
    }, 1);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
