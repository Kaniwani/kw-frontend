import getSrsRankName from "../getSrsRankName";

describe("getSrsRankName", () => {
  it("should default to rank one with no params", () =>
    expect(getSrsRankName()).toMatchSnapshot());

  it("should return expected ranks for given streak numbers", () => {
    [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((num) =>
      expect(getSrsRankName(num)).toMatchSnapshot()
    );
  });
});
