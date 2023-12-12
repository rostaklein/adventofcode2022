import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("09");

const solve = () => {
  const starters = input.map((it) => it.split(" ").map(Number));

  return starters
    .map((it) => {
      const allLines = [it];
      let currentLine = it;

      while (!currentLine.every((it) => it === 0)) {
        const newLine: number[] = [];

        currentLine.forEach((it, idx) => {
          if (idx > 0) {
            const diff = it - currentLine[idx - 1];
            newLine.push(diff);
          }
        });

        currentLine = newLine;
        allLines.push(newLine);
      }

      return allLines;
    })
    .map((it) => {
      return it.reverse().map((currentLine, idx, arr) => {
        if (idx === 0) {
          currentLine.unshift(0);
          return currentLine;
        }

        const previousLine = arr[idx - 1];
        const previousFirst = previousLine[0];
        const currentFirst = currentLine[0];

        currentLine.unshift(currentFirst - previousFirst);

        return currentLine;
      });
    })
    .reduce((acc, curr) => {
      const latestNum = curr[curr.length - 1][0];
      return acc + latestNum;
    }, 0);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
