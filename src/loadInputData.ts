export const loadInputData = async (dayNumber: string) => {
  const rawData = await Deno.readTextFile(
    `./src/day${dayNumber}/input/input.txt`
  );

  return rawData.split("\n");
};
