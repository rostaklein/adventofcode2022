import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("08");

const getColumn = (idx: number, lines: number[][]) => {
  return lines.reduce((acc, curr) => {
    acc.push(curr[idx]);

    return acc;
  }, []);
};

const isTreeVisible = (
  rowIdx: number,
  colIdx: number,
  row: number[],
  column: number[],
  tree: number
): boolean => {
  const rowLeft = [...row];
  const rowRight = rowLeft.splice(colIdx);
  rowRight.shift();

  const visibleFromRow =
    rowLeft.every((num) => num < tree) || rowRight.every((num) => num < tree);
  // console.log({ rowLeft, tree, rowRight });

  const columnUp = [...column];
  const columnDown = columnUp.splice(rowIdx);
  columnDown.shift();

  const visibleFromColumn =
    columnUp.every((num) => num < tree) ||
    columnDown.every((num) => num < tree);

  // console.log({ columnUp, tree, columnDown });
  return visibleFromRow || visibleFromColumn;
};

export const getSolution = (input: string[]) => {
  const lines = input.map((line) => line.split("").map(Number));
  const visibleTrees = lines.reduce((acc, row, rowIdx) => {
    row.forEach((tree, colIdx) => {
      const column = getColumn(colIdx, lines);

      // edges
      if (
        colIdx === 0 ||
        rowIdx === 0 ||
        colIdx === column.length - 1 ||
        rowIdx === row.length - 1
      ) {
        acc += 1;
        return acc;
      }

      if (isTreeVisible(rowIdx, colIdx, row, column, tree)) {
        acc += 1;
        return acc;
      }
      // console.log({ rowIdx, colIdx, tree, row, column });
    });

    return acc;
  }, 0);
  return visibleTrees;
};

console.log(getSolution(input));
