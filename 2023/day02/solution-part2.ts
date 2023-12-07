import { loadInputData } from "../../loadInputData.ts";

const input = await loadInputData("02");

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

const findMaxPerColor = (sets: ReturnType<typeof parseGames>[0]["sets"][0]) => {
  const allBlue = sets.filter((v) => v.color === "blue");
  const allGreen = sets.filter((v) => v.color === "green");
  const allRed = sets.filter((v) => v.color === "red");

  return {
    blue: Math.max(...allBlue.map((v) => v.count)),
    green: Math.max(...allGreen.map((v) => v.count)),
    red: Math.max(...allRed.map((v) => v.count)),
  };
};

const findMinCubesPerColorToPlayWith = (
  game: ReturnType<typeof parseGames>[0]
) => {
  const allSets = game.sets.flat();

  return findMaxPerColor(allSets);
};

const solve = () => {
  const allGames = parseGames();

  return allGames
    .map(findMinCubesPerColorToPlayWith)
    .map((v) => v.blue * v.green * v.red)
    .reduce((a, b) => a + b);
};

console.log(Deno.inspect(solve(), { depth: Infinity, colors: true }));
