import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { loadInputData } from "../loadInputData.ts";
import { getSolution } from "./solution-part1.ts";

const input = await loadInputData("04", "demo");

Deno.test("solution 1 works", () => {
  assertEquals(getSolution(input), 2);
});
