import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("05");

const doMove = (
  stacksMap: Map<number, string[]>,
  instruction: {
    count: number;
    from: number;
    to: number;
  }
) => {
  const fromStack = stacksMap.get(instruction.from);
  const toStack = stacksMap.get(instruction.to);

  const movingStack = [];
  for (let i = 1; i <= instruction.count; i++) {
    const topOne = fromStack?.shift();
    if (!topOne) {
      console.log(stacksMap);
      console.log(i, instruction);
      throw new Error("Nothing on the top");
    }
    movingStack.push(topOne!);
  }

  toStack?.unshift.apply(toStack, movingStack);
};

export const getSolution = (input: string[]) => {
  const lineLength = input[0].length;
  const stackLines = input.filter((line) => line.includes("["));
  const instructionLines = input.filter((line) => line.includes("move"));

  const stacks = [];

  for (let i = 0; i < lineLength; i++) {
    if ((i + 1) % 2 === 0) {
      const stack = [];
      for (const line of stackLines) {
        if (line[i] !== " ") {
          stack.push(line[i]);
        }
      }
      if (stack.length > 0) {
        stacks.push(stack);
      }
    }
  }

  const instructions = instructionLines.map((line) => {
    const [count, from, to] = line
      .replace("move ", "")
      .replace(" from", "")
      .replace(" to", "")
      .trim()
      .split(" ")
      .map(Number);

    return { count, from, to };
  });

  const stacksMap = new Map(
    Object.entries(stacks).map(([idx, value]) => [Number(idx) + 1, value])
  );

  instructions.forEach((instr) => doMove(stacksMap, instr));

  console.log(stacksMap);

  return [...stacksMap.values()].reduce(
    (acc, [firstLetter]) => (acc += firstLetter),
    ""
  );
};

console.log(getSolution(input));
