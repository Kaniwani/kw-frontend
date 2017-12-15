import "jest-styled-components";
import React from "react";
import { render } from "enzyme";
import StreakIcon from "../index";

describe("<StreakIcon />", () => {
  it("should match baseline snapshot", () => {
    expect(render(<StreakIcon />)).toMatchSnapshot();
  });
  it("should adapt to streakName", () => {
    expect(render(<StreakIcon streakName="GURU" />)).toMatchSnapshot();
  });
  it("should render appropriate streakName color", () => {
    expect(render(<StreakIcon streakName="GURU" colored />)).toMatchSnapshot();
  });
});
