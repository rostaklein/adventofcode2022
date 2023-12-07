import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("03");

const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

const containsSymbol = (value: string) => {
  const a = value.replaceAll(".", "").replace(/\d/g, "");
  return a.length > 0;
};

const solve = () => {
  const partNumbers = [];

  let lineIndex = 0;
  for (const line of input) {
    let currentNumber = "";
    let charactersAround = "";
    for (let i = 0; i <= line.length; i++) {
      if (!isNumber(line[i])) {
        if (currentNumber === "") {
          continue;
        }
        console.log(
          currentNumber,
          charactersAround,
          containsSymbol(charactersAround)
        );
        if (containsSymbol(charactersAround)) {
          partNumbers.push(Number(currentNumber));
        }

        currentNumber = "";
        charactersAround = "";
        continue;
      }

      currentNumber += line[i];
      const charToTheRight = line[i + 1] ?? "";
      const charToTheLeft = line[i - 1] ?? "";
      const charAbove = input[lineIndex - 1]?.[i] ?? "";
      const charBelow = input[lineIndex + 1]?.[i] ?? "";
      const charDiagonalTopLeft = input[lineIndex - 1]?.[i - 1] ?? "";
      const charDiagonalTopRight = input[lineIndex - 1]?.[i + 1] ?? "";
      const charDiagonalBottomLeft = input[lineIndex + 1]?.[i - 1] ?? "";
      const charDiagonalBottomRight = input[lineIndex + 1]?.[i + 1] ?? "";
      charactersAround += `${charToTheRight}${charToTheLeft}${charAbove}${charBelow}${charDiagonalTopLeft}${charDiagonalTopRight}${charDiagonalBottomLeft}${charDiagonalBottomRight}`;
    }

    lineIndex++;
  }

  return partNumbers.reduce((a, b) => a + b);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
