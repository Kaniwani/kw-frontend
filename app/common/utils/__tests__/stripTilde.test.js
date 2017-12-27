import stripTilde from "../stripTilde";

describe("stripTilde()", () => {
  it("should have a safe default", () => {
    expect(stripTilde()).toEqual("");
    expect(stripTilde("剤")).toEqual("剤");
  });

  it("should strip JA tilde", () => {
    expect(stripTilde("〜剤")).toEqual("剤");
    expect(stripTilde("剤〜")).toEqual("剤");
    expect(stripTilde("〜かた")).toEqual("かた");
    expect(stripTilde("かた〜")).toEqual("かた");
  });

  it("should strip EN tilde", () => {
    expect(stripTilde("~剤")).toEqual("剤");
    expect(stripTilde("剤~")).toEqual("剤");
    expect(stripTilde("~かた")).toEqual("かた");
    expect(stripTilde("かた~")).toEqual("かた");
  });
});
