import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("01");

const wordToNumber: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getCalibrationValues = () => {
  const nums = input.map((line) => {
    const nums = Array.from(
      line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
    )
      .flat()
      .filter((v) => v !== "")
      .map((v) => wordToNumber[v] ?? v);

    return Number(`${nums[0]}${nums[nums.length - 1]}`);
  });

  const sum = nums.reduce((a, b) => a + b);

  return sum;
};

console.log(getCalibrationValues());
