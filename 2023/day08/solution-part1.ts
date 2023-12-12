import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("08");

type Node = {
  left: string;
  right: string;
};

const solve = () => {
  const nodeMap = new Map<string, Node>();

  const [instructions, , ...nodeLines] = input;

  for (const line of nodeLines) {
    const [node, others] = line.split(" = ");
    const [left, right] = others.replace("(", "").replace(")", "").split(", ");
    nodeMap.set(node, { left, right });
  }

  let currentNode = "AAA";
  let stepsTaken = 0;

  while (true) {
    const direction = instructions.split("")[stepsTaken % instructions.length];
    stepsTaken++;

    const node = nodeMap.get(currentNode)!;
    currentNode = direction === "L" ? node.left : node.right;

    console.log({ currentNode });
    if (currentNode === "ZZZ") {
      return stepsTaken;
    }
  }
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
