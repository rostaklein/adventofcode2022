import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("02");

const max: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseGames = () => {
  return input.map((line) => {
    const gameName = line.split(": ")[0];
    const gameNumber = Number(gameName.replace(/\D/g, ""));
    const sets = line
      .replace(gameName, "")
      .replace(": ", "")
      .split("; ")
      .map((set) => {
        const a = set.split(", ");

        const count = a.map((v) => {
          const count = Number(v.replace(/\D/g, ""));
          return { count, color: v.replace(/\d/g, "").trim() };
        });

        return count;
      });
    return {
      gameName,
      gameNumber,
      sets,
    };
  });
};

const solve = () => {
  const allGames = parseGames();
  const possibleGames = allGames.filter((game) => {
    const hasImpossibleSet = game.sets.some((set) => {
      return set.some(({ count, color }) => {
        if (count > max[color]) {
          return true;
        }
      });
    });

    return !hasImpossibleSet;
  });

  return possibleGames.reduce((a, b) => a + b.gameNumber, 0);
};

console.log(solve());
