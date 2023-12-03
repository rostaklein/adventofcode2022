import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("09");

type Direction = "up" | "down" | "left" | "right";
type Instruction = {
  direction: Direction;
  distance: number;
};

const parseInstruction = (line: string): Instruction => {
  const [dir, distance] = line.split(" ");

  const getDirection = (): Direction => {
    switch (dir) {
      case "U":
        return "up";
      case "D":
        return "down";
      case "L":
        return "left";
      case "R":
        return "right";
      default:
        throw new Error("Invalid direction");
    }
  };

  return {
    direction: getDirection(),
    distance: Number(distance),
  };
};

type Position = {
  x: number;
  y: number;
};

class Grid {
  public items = new Map<string, Position>();
  public placeItem(name: string, position: Position) {
    this.items.set(name, position);
  }
  public getItemPosition(name: string): Position {
    return this.items.get(name)!;
  }
  public moveItem(name: string, move: { x?: number; y?: number }) {
    const item = this.items.get(name)!;
    if (move.x) {
      item.x += move.x;
    }
    if (move.y) {
      item.y += move.y;
    }

    return item;
  }
}

const positionAbsDifference = (a: Position, b: Position): Position => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

export const getSolution = (input: string[]) => {
  const instructions = input.map(parseInstruction);

  const uniquePositions = new Set<string>();
  const grid = new Grid();

  grid.placeItem("H", { x: 0, y: 4 });
  grid.placeItem("T", { x: 0, y: 4 });

  for (const { direction, distance } of instructions) {
    let moveRest = distance;
    while (moveRest > 0) {
      const headPositionBefore = { ...grid.getItemPosition("H") };
      const tailPosition = grid.getItemPosition("T");

      switch (direction) {
        case "right":
          grid.moveItem("H", { x: 1 });
          break;
        case "left":
          grid.moveItem("H", { x: -1 });
          break;
        case "up":
          grid.moveItem("H", { y: -1 });
          break;
        case "down":
          grid.moveItem("H", { y: 1 });
          break;
      }
      const updatedHeadPosition = grid.getItemPosition("H");
      const difference = positionAbsDifference(
        updatedHeadPosition,
        tailPosition
      );

      if (Math.abs(difference.x) > 1 || Math.abs(difference.y) > 1) {
        grid.placeItem("T", headPositionBefore);
      }

      const tailFinalPosition = grid.getItemPosition("T");
      uniquePositions.add(`${tailFinalPosition.x}:${tailFinalPosition.y}`);
      moveRest--;
    }
  }

  return uniquePositions.size;
};

console.log(getSolution(input));
