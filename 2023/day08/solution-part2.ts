import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("08");

type Node = {
  left: string;
  right: string;
};

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

const solve = () => {
  const nodeMap = new Map<string, Node>();

  const [instructions, , ...nodeLines] = input;

  for (const line of nodeLines) {
    const [node, others] = line.split(" = ");
    const [left, right] = others.replace("(", "").replace(")", "").split(", ");
    nodeMap.set(node, { left, right });
  }

  let currentNodes = [...nodeMap.keys()].filter((v) => v.endsWith("A"));

  const ghostSteps: number[] = [];

  let stepsTaken = 0;

  while (currentNodes.length > 0) {
    const direction = instructions.split("")[stepsTaken % instructions.length];
    stepsTaken++;

    const proposed = currentNodes
      .map((n) =>
        direction === "L" ? nodeMap.get(n)!.left : nodeMap.get(n)!.right
      )
      .filter((n) => !n.endsWith("Z"));

    if (currentNodes.length != proposed.length) {
      // Steps at one or more Z found
      ghostSteps.push(stepsTaken);
    }

    currentNodes = proposed;
  }

  return ghostSteps.reduce(lcm, 1);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
