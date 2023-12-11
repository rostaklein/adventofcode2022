import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("06");

class Race {
  constructor(public time: number, public distance: number) {}

  public getFirstOption() {
    let holdFor = 0;

    while (holdFor < this.time) {
      const remainingTime = this.time - holdFor;
      if (remainingTime * holdFor > this.distance) {
        return {
          traveledDistance: remainingTime * holdFor,
          holdFor,
        };
      }
      holdFor++;
    }

    throw new Error("No first option found");
  }

  public getLastOption() {
    let holdFor = this.time;

    while (holdFor > 0) {
      const remainingTime = this.time - holdFor;

      if (remainingTime * holdFor > this.distance) {
        return {
          traveledDistance: remainingTime * holdFor,
          holdFor,
        };
      }

      holdFor--;
    }

    throw new Error("No last option found");
  }
}

const solve = () => {
  const time = input[0].split(" ").map(Number).filter(Boolean).join("");
  const distance = input[1].split(" ").map(Number).filter(Boolean).join("");

  const race = new Race(Number(time), Number(distance));

  const options = {
    first: race.getFirstOption(),
    last: race.getLastOption(),
  };

  return options.last.holdFor - options.first.holdFor + 1;
  // return races
  //   .map((race) => ({
  //     first: race.getFirstOption(),
  //     last: race.getLastOption(),
  //   }))
  //   .map(({ first, last }) => last.holdFor - first.holdFor + 1)
  //   .reduce((a, b) => a * b, 1);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
