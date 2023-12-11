import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("07");

const HAND_TYPES = {
  "five-of-a-kind": 7,
  "four-of-a-kind": 6,
  "full-house": 5,
  "three-of-a-kind": 4,
  "two-pairs": 3,
  "one-pair": 2,
  "high-card": 1,
};

const CARD_VALUES: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
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

const scoreHandByType = (hand: string[]) => {
  switch (true) {
    case hasNOfAKind(hand, 5):
      return HAND_TYPES["five-of-a-kind"];
    case hasNOfAKind(hand, 4):
      return HAND_TYPES["four-of-a-kind"];
    case hasFullHouse(hand):
      return HAND_TYPES["full-house"];
    case hasNOfAKind(hand, 3):
      return HAND_TYPES["three-of-a-kind"];
    case hasDoublePair(hand):
      return HAND_TYPES["two-pairs"];
    case hasNOfAKind(hand, 2):
      return HAND_TYPES["one-pair"];
    default:
      return HAND_TYPES["high-card"];
  }
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
    .map(([hand, bid]) => ({ hand: hand.split(""), bid: Number(bid) }));

  return hands
    .map(({ hand, bid }) => ({
      hand: hand.join(""),
      scoreByType: scoreHandByType(hand),
      bid,
    }))
    .sort((a, b) => {
      if (a.scoreByType === b.scoreByType) {
        return compareHandByCardValues(a.hand.split(""), b.hand.split(""));
      }

      return a.scoreByType - b.scoreByType;
    })
    .reduce((acc, curr, idx) => {
      return acc + curr.bid * (idx + 1);
    }, 0);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
