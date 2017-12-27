import "jest-styled-components";
import React from "react";
import { shallow } from "enzyme";
import ReadingLinks from "../index";

describe("<ReadingLinks />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<ReadingLinks />)).toMatchSnapshot();
  });
});
