import toUniqueStringsArray from "../toUniqueStringsArray";

describe("toUniqueStringsArray", () => {
  it("sane defaults", () => {
    expect(toUniqueStringsArray()).toEqual([]);
    expect(toUniqueStringsArray(null)).toEqual([]);
    expect(toUniqueStringsArray({})).toEqual([]);
    expect(toUniqueStringsArray("")).toEqual([]);
    expect(toUniqueStringsArray([])).toEqual([]);
  });

  it("handles a single string", () => {
    expect(toUniqueStringsArray("red")).toEqual(["red"]);
  });

  it("handles comma separated string", () => {
    expect(toUniqueStringsArray("red, blue, red, green, blue")).toEqual([
      "red",
      "blue",
      "green",
    ]);
  });

  it("handles array of strings", () => {
    expect(toUniqueStringsArray(["red", "blue", "red", "green", "blue"])).toEqual([
      "red",
      "blue",
      "green",
    ]);
  });
});
