import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("03");

const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

// const containsSymbol = (value: ReturnType<typeof getCharactersAround>[]) => {
//   const charactersAround = value
//     .flat()
//     .map((v) => Object.values(v))
//     .map((v) => v.map((v) => v.character).join(""))
//     .join("");

//   const a = charactersAround.replaceAll(".", "").replace(/\d/g, "");
//   return a.includes("*");
// };

const getCharactersAround = (lineIndex: number, i: number) => {
  const charToTheRight = {
    character: input[lineIndex]?.[i + 1] ?? "",
    indexX: i + 1,
    indexY: lineIndex,
  };
  const charToTheLeft = {
    character: input[lineIndex]?.[i - 1] ?? "",
    indexX: i - 1,
    indexY: lineIndex,
  };
  const charAbove = {
    character: input[lineIndex - 1]?.[i] ?? "",
    indexX: i,
    indexY: lineIndex - 1,
  };
  const charBelow = {
    character: input[lineIndex + 1]?.[i] ?? "",
    indexX: i,
    indexY: lineIndex + 1,
  };
  const charDiagonalTopLeft = {
    character: input[lineIndex - 1]?.[i - 1] ?? "",
    indexX: i - 1,
    indexY: lineIndex - 1,
  };
  const charDiagonalTopRight = {
    character: input[lineIndex - 1]?.[i + 1] ?? "",
    indexX: i + 1,
    indexY: lineIndex - 1,
  };
  const charDiagonalBottomLeft = {
    character: input[lineIndex + 1]?.[i - 1] ?? "",
    indexX: i - 1,
    indexY: lineIndex + 1,
  };
  const charDiagonalBottomRight = {
    character: input[lineIndex + 1]?.[i + 1] ?? "",
    indexX: i + 1,
    indexY: lineIndex + 1,
  };
  return {
    charToTheRight,
    charToTheLeft,
    charAbove,
    charBelow,
    charDiagonalTopLeft,
    charDiagonalTopRight,
    charDiagonalBottomLeft,
    charDiagonalBottomRight,
  };
};

const solve = () => {
  const partNumbers = [];

  let lineIndex = 0;
  for (const line of input) {
    let currentNumber = "";
    let charactersAround: ReturnType<typeof getCharactersAround>[] = [];
    for (let i = 0; i <= line.length; i++) {
      if (!isNumber(line[i])) {
        if (currentNumber === "") {
          continue;
        }

        partNumbers.push({ num: Number(currentNumber), charactersAround });
        currentNumber = "";
        charactersAround = [];
        continue;
      }

      currentNumber += line[i];
      charactersAround.push(getCharactersAround(lineIndex, i));
    }

    lineIndex++;
  }

  const mappedGears = partNumbers
    .map((v) => ({
      num: v.num,
      charactersAround: v.charactersAround
        .map((v) => Object.values(v))
        .flat()
        .filter((v) => v.character === "*"),
    }))
    .map((v) => ({
      ...v,
      gearCodes: v.charactersAround.map((v) => `${v.indexX}-${v.indexY}`),
    }))
    .filter((v) => v.charactersAround.length > 0);

  const uniqueGearCodes = new Set(mappedGears.map((v) => v.gearCodes).flat());
  const partNumbersPerGearCode = Array.from(uniqueGearCodes).map((gearCode) => {
    return {
      gearCode,
      partNumbers: mappedGears
        .filter((v) => v.gearCodes.includes(gearCode))
        .map((v) => v.num),
    };
  });
  return {
    partNumbersPerGearCode,
    solution: partNumbersPerGearCode
      .filter((v) => v.partNumbers.length === 2)
      .map((v) => ({
        ...v,
        multiplied: v.partNumbers.reduce((a, b) => a * b),
      }))
      .reduce((a, b) => a + b.multiplied, 0),
  };
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
