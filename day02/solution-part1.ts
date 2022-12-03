import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("02");

const optionsMap = new Map<string, "rock" | "paper" | "scissors">([
  ["A", "rock"],
  ["B", "paper"],
  ["C", "scissors"],
  ["X", "rock"],
  ["Y", "paper"],
  ["Z", "scissors"],
]);

const bonusPointsMap = new Map<"rock" | "paper" | "scissors", number>([
  ["rock", 1],
  ["paper", 2],
  ["scissors", 3],
]);

const getTotalScore = () => {
  let myScore = 0;

  for (const round of input) {
    const [opponent, me] = round.split(" ");

    const opponentOption = optionsMap.get(opponent)!;
    const myOption = optionsMap.get(me)!;

    if (opponentOption === myOption) {
      myScore += 3;
    }

    if (myOption === "paper") {
      if (opponentOption === "rock") {
        myScore += 6;
      }
    }
    if (myOption === "rock") {
      if (opponentOption === "scissors") {
        myScore += 6;
      }
    }

    if (myOption === "scissors") {
      if (opponentOption === "paper") {
        myScore += 6;
      }
    }

    myScore += bonusPointsMap.get(myOption) ?? 0;
  }
  return myScore;
};

console.log(getTotalScore());
