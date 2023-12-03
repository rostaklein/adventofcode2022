import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("03");

const getLetterValue = (letter: string) => {
  const charCode = letter.charCodeAt(0);
  const isUpperCase = charCode <= 90;

  return isUpperCase ? charCode - 38 : charCode - 96;
};

export const getSolution = (input: string[]) => {
  return input
    .map((line) => ({
      first: line
        .split("")
        .splice(0, line.length / 2)
        .join(""),
      second: line
        .split("")
        .slice(line.length / 2)
        .join(""),
    }))
    .reduce<
      Array<{
        first: string;
        second: string;
        sameLetter: string;
        value: number;
      }>
    >((acc, curr) => {
      const sameLetter = curr.first
        .split("")
        .find((letter) => curr.second.split("").includes(letter));

      if (!sameLetter) {
        throw new Error("No letter is the same in first and second rucksack");
      }

      acc.push({
        ...curr,
        sameLetter,
        value: getLetterValue(sameLetter),
      });

      return acc;
    }, [])
    .reduce((acc, curr) => {
      return (acc += curr.value);
    }, 0);
};

console.log(getSolution(input));
