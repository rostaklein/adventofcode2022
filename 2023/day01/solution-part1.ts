import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("01");

const getCalibrationValues = () => {
  const nums = input.map((line) => {
    const numbers = line.replace(/\D/g, "");
    const firstNumber = numbers.charAt(0);
    const lastNumber = numbers.charAt(numbers.length - 1);
    return Number(`${firstNumber}${lastNumber}`);
  });

  const sum = nums.reduce((a, b) => a + b);

  return sum;
};

console.log(getCalibrationValues());
