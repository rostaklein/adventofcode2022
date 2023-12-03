import { loadInputData } from "../../loadInputData.ts";

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

const outcomeMap = new Map<string, "win" | "loose" | "draw">([
  ["X", "loose"],
  ["Y", "draw"],
  ["Z", "win"],
]);

const winsLoosesOverMap = new Map<
  "rock" | "paper" | "scissors",
  {
    winsOver: "rock" | "paper" | "scissors";
    loosesOver: "rock" | "paper" | "scissors";
  }
>([
  ["rock", { winsOver: "scissors", loosesOver: "paper" }],
  ["paper", { winsOver: "rock", loosesOver: "scissors" }],
  ["scissors", { winsOver: "paper", loosesOver: "rock" }],
]);

const getMyDraw = (
  outcomeLetter: string,
  opponentOption: "rock" | "paper" | "scissors"
): "rock" | "paper" | "scissors" => {
  const outcome = outcomeMap.get(outcomeLetter);
  console.log({ outcome });

  if (outcome === "draw") {
    return opponentOption;
  }

  if (outcome === "win") {
    return winsLoosesOverMap.get(opponentOption)?.loosesOver!;
  }

  if (outcome === "loose") {
    return winsLoosesOverMap.get(opponentOption)?.winsOver!;
  }

  throw new Error("Couldnt determine my draw.");
};

const getTotalScore = () => {
  let myScore = 0;

  for (const round of input) {
    const [opponent, outcomeLetter] = round.split(" ");

    const opponentOption = optionsMap.get(opponent)!;
    const myOption = getMyDraw(outcomeLetter, opponentOption);

    console.log({ opponentOption, myOption });
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

    console.log({ myScore });
  }
  return myScore;
};

console.log(getTotalScore());
