import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("04");

const getStartEnd = (instruction: string): [number, number] => {
  return instruction.split("-").map(Number) as [number, number];
};

const fullyContainsOther = ([a, b]: [
  [number, number],
  [number, number]
]): boolean => {
  return (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]);
};

export const getSolution = (input: string[]) => {
  return input
    .reduce<
      {
        sequences: [[number, number], [number, number]];
        fullyContains: boolean;
      }[]
    >((acc, curr) => {
      const [first, second] = curr.split(",").map(getStartEnd);

      acc.push({
        sequences: [first, second],
        fullyContains: fullyContainsOther([first, second]),
      });

      return acc;
    }, [])
    .reduce((acc, curr) => (acc += curr.fullyContains ? 1 : 0), 0);
};

console.log(getSolution(input));
