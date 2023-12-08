import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("05");

type Instruction = {
  destination: number;
  source: number;
  range: number;
};

class Category {
  public instructions: Instruction[] = [];
  constructor(private name: string) {}

  public getCorrespondingDestination(num: number) {
    const matchingInstruction = this.instructions.find((v) => {
      return num >= v.source && num <= v.source + v.range;
    });

    if (!matchingInstruction) {
      return num;
    }

    return matchingInstruction.destination + (num - matchingInstruction.source);
  }
}

const createCategories = () => {
  const categories: Category[] = [];

  let currentCategory: Category | null = null;

  for (const line of input) {
    if (line.includes("map:")) {
      const category = new Category(line.replace(" map:", ""));
      categories.push(category);
      currentCategory = category;
      continue;
    }

    if (line.length === 0) {
      continue;
    }

    const [destination, source, range] = line.split(" ").map(Number);
    currentCategory?.instructions.push({ destination, source, range });
  }

  return categories;
};

const solve = () => {
  const seeds = input[0].replace("seeds: ", "").split(" ").map(Number);
  const categories = createCategories();

  for (const category of categories) {
    seeds.forEach((seed, i) => {
      seeds[i] = category.getCorrespondingDestination(seed);
    });
  }
  return { seeds, min: Math.min(...seeds) };
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
