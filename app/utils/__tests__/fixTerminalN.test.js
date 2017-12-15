import fixTerminalN from "../fixTerminalN";

describe("fixTerminalN", () => {
  it("should have sane defaults", () => {
    expect(fixTerminalN()).toBe("");
    expect(fixTerminalN("")).toBe("");
  });

  it('should fix trailing english "n"', () => {
    expect(fixTerminalN("かn")).toBe("かん");
  });

  it('should fix trailing japanese half-width "ｎ"', () => {
    expect(fixTerminalN("かｎ")).toBe("かん");
  });
});
