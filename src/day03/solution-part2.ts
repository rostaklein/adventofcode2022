import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("03");

const getLetterValue = (letter: string) => {
  const charCode = letter.charCodeAt(0);
  const isUpperCase = charCode <= 90;

  return isUpperCase ? charCode - 38 : charCode - 96;
};

const getSameLetter = (letterGroups: [string, string, string]) => {
  for (const letterA of letterGroups[0]) {
    for (const letterB of letterGroups[1]) {
      for (const letterC of letterGroups[2]) {
        if (letterA === letterB && letterB === letterC) {
          return letterA;
        }
      }
    }
  }

  throw new Error("No same letter found");
};

const getRucksacks = () => {
  return input
    .reduce<{ items: [string, string, string] }[]>((acc, curr, idx, array) => {
      if ((idx + 1) % 3 === 0) {
        acc.push({ items: [array[idx - 2], array[idx - 1], curr] });
      }
      return acc;
    }, [])
    .reduce<
      { items: [string, string, string]; sameLetter: string; value: number }[]
    >((acc, curr) => {
      const sameLetter = getSameLetter(curr.items);
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

console.log(getRucksacks());
