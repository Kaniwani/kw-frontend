import "jest-styled-components";
import React from "react";
import { shallow } from "enzyme";
import KanjiStroke from "../index";

describe("<KanjiStroke />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<KanjiStroke />)).toMatchSnapshot();
  });
});
