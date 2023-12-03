import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("10");

type Instruction =
  | {
      type: "noop";
    }
  | {
      type: "add";
      num: number;
    };

class Processor {
  x = 1;
  cycle = 0;
  image = "";
  heap: Record<number, Instruction[]> = {};

  signalStrengths: number[] = [];

  constructor(private instructions: Instruction[]) {}

  public process() {
    for (const instruction of this.instructions) {
      switch (instruction.type) {
        case "noop":
          this.nextCycle();
          break;
        case "add":
          this.nextCycle();
          this.nextCycle();
          this.x += instruction.num;
          break;
        default:
          break;
      }
    }
  }

  private nextCycle() {
    this.cycle++;

    this.drawImage();
    this.signalStrengths[this.cycle] = this.x * this.cycle;
  }

  private drawImage() {
    const breakPoints = [40, 80, 120, 160, 200, 240];
    const spritePosition = [this.x - 1, this.x, this.x + 1];

    const pixelPosInLine = (this.cycle - 1) % 40;

    if (spritePosition.includes(pixelPosInLine)) {
      this.image += "#";
    } else {
      this.image += ".";
    }

    if (breakPoints.includes(this.cycle)) {
      this.image += "\n";
    }
  }
}

export const getSolution = (input: string[]) => {
  const instructions: Instruction[] = input.map((line) => {
    if (line === "noop") {
      return {
        type: "noop",
      };
    }
    const [_, num] = line.split(" ");

    return {
      type: "add",
      num: Number(num),
    };
  });

  const processor = new Processor(instructions);

  processor.process();

  console.log(processor.image);
  return (
    processor.signalStrengths[20] +
    processor.signalStrengths[60] +
    processor.signalStrengths[100] +
    processor.signalStrengths[140] +
    processor.signalStrengths[180] +
    processor.signalStrengths[220]
  );
};

console.log(getSolution(input));
