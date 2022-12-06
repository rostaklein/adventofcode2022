import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("06");

const hasUniqueCharacters = (str: string) => {
  return new Set(str.split("")).size === str.length;
};

export const getSolution = (input: string[]) => {
  let i = 0;
  let lastFour = "";
  for (const char of input[0]) {
    lastFour += char;
    if (i > 3) {
      const firstRemoved = lastFour.split("");
      firstRemoved.shift();
      lastFour = firstRemoved.join("");
      if (hasUniqueCharacters(lastFour)) {
        return { lastFour, pos: i + 1 };
      }
    }
    i++;
  }
};

console.log(getSolution(input));
