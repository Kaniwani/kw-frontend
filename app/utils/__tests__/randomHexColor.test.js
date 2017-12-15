import randomHexColor from "../randomHexColor";

describe("randomHexColor()", () => {
  it("should return a hex color string", () => {
    const hexColorStringRegex = new RegExp(
      /^#?(?:(?:[0-9a-fA-F]{2}){3}|(?:[0-9a-fA-F]){3})$/
    );
    expect(randomHexColor()).toMatch(hexColorStringRegex);
  });

  it("should be different on subsequent calls", () => {
    const colors = Array.from({ length: 50 }).map(() => randomHexColor());
    const uniqueColors = new Set(colors);
    expect(colors.length).toEqual(uniqueColors.size);
  });
});
