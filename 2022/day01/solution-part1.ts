import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("01");

const getMaxSum = () => {
  let temporarySum = 0;

  return input.reduce((acc, curr) => {
    if (curr !== "") {
      temporarySum += Number(curr);
    } else {
      if (temporarySum > acc) {
        acc = temporarySum;
      }
      temporarySum = 0;
    }

    return acc;
  }, 0);
};

console.log(getMaxSum());
