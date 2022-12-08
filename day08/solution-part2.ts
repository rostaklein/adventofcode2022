import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("08");

const getColumn = (idx: number, lines: number[][]) => {
  return lines.reduce((acc, curr) => {
    acc.push(curr[idx]);

    return acc;
  }, []);
};

const getViewDistance = (
  currentTree: number,
  trees: number[],
  direction: "left" | "right"
): number => {
  const treesInDirection = direction === "left" ? trees.reverse() : trees;
  let distance = 0;
  for (const tree of treesInDirection) {
    if (tree >= currentTree) {
      return distance + 1;
    }
    distance += 1;
  }

  return distance;
};

const getScenicScore = (
  rowIdx: number,
  colIdx: number,
  row: number[],
  column: number[],
  tree: number
): number => {
  const rowLeft = [...row];
  const rowRight = rowLeft.splice(colIdx);
  rowRight.shift();
  const columnUp = [...column];
  const columnDown = columnUp.splice(rowIdx);
  columnDown.shift();

  const scoreFromLeft = getViewDistance(tree, rowLeft, "left");
  const scoreFromRight = getViewDistance(tree, rowRight, "right");
  const scoreFromUp = getViewDistance(tree, columnUp, "left");
  const scoreFromDown = getViewDistance(tree, columnDown, "right");
  // console.log({
  //   tree,
  //   scoreFromLeft,
  //   scoreFromRight,
  //   scoreFromUp,
  //   scoreFromDown,
  // });

  // console.log({ columnUp, tree, columnDown });
  return scoreFromLeft * scoreFromRight * scoreFromUp * scoreFromDown;
};

export const getSolution = (input: string[]) => {
  const lines = input.map((line) => line.split("").map(Number));
  const visibleTrees = lines.reduce((acc, row, rowIdx) => {
    row.forEach((tree, colIdx) => {
      const column = getColumn(colIdx, lines);

      acc.push(getScenicScore(rowIdx, colIdx, row, column, tree));
    });
    return acc;
  }, []);

  return Math.max(...visibleTrees);
};

console.log(getSolution(input));
