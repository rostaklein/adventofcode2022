export const loadInputData = async (
  dayNumber: string,
  type: "input" | "demo" = "input"
) => {
  const rawData = await Deno.readTextFile(
    `./2023/day${dayNumber}/input/${type}.txt`
  );

  return rawData.split("\n");
};
