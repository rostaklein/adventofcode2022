import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("04");

class Card {
  public score: number;
  public processed = false;

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
        score++;
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
  const originalCards = input.map(createCard);
  const pile = new Map<number, { count: number }>(
    originalCards.map((v) => [v.num, { count: 1 }])
  );

  for (const originalCard of originalCards) {
    const copiesCount = pile.get(originalCard.num)?.count ?? 0;
    for (
      let i = originalCard.num + 1;
      i <= originalCard.num + originalCard.score;
      i++
    ) {
      pile.set(i, { count: (pile.get(i)?.count ?? 0) + copiesCount });
    }
  }

  return {
    pile,
    originalCards,
    pileSize: [...pile.values()].reduce((a, b) => a + b.count, 0),
  };
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
