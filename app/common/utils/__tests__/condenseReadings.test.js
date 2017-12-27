import * as readings from "common/data/readings";
import condenseReadings from "../condenseReadings";

describe("condenseReadings()", () => {
  it("should have a safe default", () => {
    expect(condenseReadings()).toMatchSnapshot();
  });

  it("should pass when only one reading", () => {
    expect(condenseReadings(readings.single)).toMatchSnapshot();
  });

  it("should combine multiple readings with same characters", () => {
    expect(condenseReadings(readings.sameCharacters)).toMatchSnapshot();
  });

  it("should pass when readings were already condensed", () => {
    const condensed = condenseReadings(readings.sameCharacters);
    expect(condenseReadings(condensed)).toMatchSnapshot();
  });

  it("should not fail with unrelated readings", () => {
    expect(
      condenseReadings(readings.sameCharacters.concat(...readings.single))
    ).toMatchSnapshot();
  });

  it("should work with prefixes", () => {
    expect(condenseReadings(readings.prefix)).toMatchSnapshot();
  });

  it("should work with suffixes", () => {
    expect(condenseReadings(readings.suffix)).toMatchSnapshot();
  });

  it("should work with mixed edge cases", () => {
    expect(condenseReadings(readings.mixed)).toMatchSnapshot();
  });

  it("should work with only kana", () => {
    expect(condenseReadings(readings.onlyKana)).toMatchSnapshot();
  });

  it("should re-order primary reading to start", () => {
    expect(condenseReadings(readings.sameCharacters)).toMatchSnapshot();
  });
});
