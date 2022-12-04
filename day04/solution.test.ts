import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { loadInputData } from "../loadInputData.ts";
import { getSolution as part1 } from "./solution-part1.ts";
import { getSolution as part2 } from "./solution-part2.ts";

const input = await loadInputData("04", "demo");

Deno.test("solution 1 works", () => {
  assertEquals(part1(input), 2);
});

Deno.test("solution 2 works", () => {
  assertEquals(part2(input), 4);
});
