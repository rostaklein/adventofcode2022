import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("01");

const getMaxSum = () => {
  let temporarySum = 0;

  return input.reduce<number[]>((acc, curr) => {
    if (curr !== "") {
      temporarySum += Number(curr);
    } else {
      acc.push(temporarySum);
      temporarySum = 0;
    }

    return acc;
  }, []);
};

const sumsSortedDesc = getMaxSum().sort().reverse();

console.log(sumsSortedDesc[0] + sumsSortedDesc[1] + sumsSortedDesc[2]);
