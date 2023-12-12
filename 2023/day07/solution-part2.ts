import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("07");

// const HAND_TYPES = {
//   "five-of-a-kind": 7,
//   "four-of-a-kind": 6,
//   "full-house": 5,
//   "three-of-a-kind": 4,
//   "two-pairs": 3,
//   "one-pair": 2,
//   "high-card": 1,
// };

const CARD_VALUES: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

const hasNOfAKind = (hand: string[], n: number) => {
  return hand.some((card) => {
    return hand.filter((v) => v === card).length === n;
  });
};

const hasDoublePair = (hand: string[]) => {
  const pairs = hand.filter((card) => {
    return hand.filter((v) => v === card).length === 2;
  });

  return pairs.length === 4;
};

const hasFullHouse = (hand: string[]) => {
  const threeOf = hand.filter((card) => {
    return hand.filter((v) => v === card).length === 3;
  });

  const twoOf = hand.filter((card) => {
    return hand.filter((v) => v === card).length === 2;
  });

  return threeOf.length === 3 && twoOf.length === 2;
};

const scoreHandByType = (rawHand: string) => {
  const hand = rawHand.split("");
  switch (true) {
    case hasNOfAKind(hand, 5):
      return { type: "five-of-a-kind", score: 7 } as const;
    case hasNOfAKind(hand, 4):
      return { type: "four-of-a-kind", score: 6 } as const;
    case hasFullHouse(hand):
      return { type: "full-house", score: 5 } as const;
    case hasNOfAKind(hand, 3):
      return { type: "three-of-a-kind", score: 4 } as const;
    case hasDoublePair(hand):
      return { type: "two-pairs", score: 3 } as const;
    case hasNOfAKind(hand, 2):
      return { type: "one-pair", score: 2 } as const;
    default:
      return { type: "high-card", score: 1 } as const;
  }
};

const replaceJokers = (hand: string) => {
  const hasJokers = hand.includes("J");

  if (!hasJokers) {
    return [{ hand, scoreByType: scoreHandByType(hand) }];
  }

  const replacedHands: string[] = [];
  for (const rank of Object.keys(CARD_VALUES)) {
    const replacedHand = hand.replaceAll("J", rank);
    replacedHands.push(replacedHand);
  }

  return replacedHands
    .map((hand) => ({ scoreByType: scoreHandByType(hand), hand }))
    .sort((a, b) => {
      return b.scoreByType.score - a.scoreByType.score;
    });
};

const compareHandByCardValues = (handA: string[], handB: string[]) => {
  const cardValuesA = handA.map((card) => CARD_VALUES[card]);
  const cardValuesB = handB.map((card) => CARD_VALUES[card]);

  for (let i = 0; i < cardValuesA.length; i++) {
    if (cardValuesA[i] > cardValuesB[i]) {
      return 1;
    }

    if (cardValuesA[i] < cardValuesB[i]) {
      return -1;
    }
  }

  return 0;
};

const solve = () => {
  const hands = input
    .map((line) => line.split(" "))
    .map(([hand, bid]) => ({ hand, bid: Number(bid) }));

  return hands
    .map(({ hand, bid }) => ({
      originalHand: hand,
      possibleHands: replaceJokers(hand),
      scoreByType: scoreHandByType(hand),
      bid,
    }))

    .map((card) => {
      const bestPossibleCard = card.possibleHands[0];

      return {
        ...card,
        bestPossibleCard,
      };
    })
    .sort((a, b) => {
      if (
        a.bestPossibleCard.scoreByType.score ===
        b.bestPossibleCard.scoreByType.score
      ) {
        return compareHandByCardValues(
          a.originalHand.split(""),
          b.originalHand.split("")
        );
      }

      return (
        a.bestPossibleCard.scoreByType.score -
        b.bestPossibleCard.scoreByType.score
      );
    })
    .reduce((acc, curr, idx) => {
      return acc + curr.bid * (idx + 1);
    }, 0);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
