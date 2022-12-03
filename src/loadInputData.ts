export const loadInputData = async (
  dayNumber: string,
  type: "input" | "demo" = "input"
) => {
  const rawData = await Deno.readTextFile(
    `./src/day${dayNumber}/input/${type}.txt`
  );

  return rawData.split("\n");
};
