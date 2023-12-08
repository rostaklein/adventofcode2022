import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("04");

class Card {
  public score: number;

  constructor(
    public num: number,
    public winningNumbers: number[],
    public haveNumbers: number[]
  ) {
    this.score = this.calculateScore();
  }

  private calculateScore() {
    const winningNumbers = this.winningNumbers ?? [];
    const haveNumbers = this.haveNumbers ?? [];

    let score = 0;

    for (const number of winningNumbers) {
      if (haveNumbers.includes(number)) {
        if (score === 0) {
          score = 1;
          continue;
        }

        score = score * 2;
      }
    }

    return score;
  }
}

const createCard = (line: string) => {
  const [card, numbers] = line.split(":");
  const [winningNumbers, haveNumbers] = numbers.split("|").map((v) => v.trim());

  return new Card(
    Number(card.replace(/\D/g, "")),
    winningNumbers
      ?.split(" ")
      .map((v) => Number(v))
      .filter((v) => v !== 0),
    haveNumbers
      ?.split(" ")
      .map((v) => Number(v))
      .filter((v) => v !== 0)
  );
};

const solve = () => {
  return input.map(createCard).reduce((a, b) => a + b.score, 0);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
