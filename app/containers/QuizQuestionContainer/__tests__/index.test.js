import "jest-styled-components";
import React from "react";
import { shallow } from "enzyme";
import QuizQuestion from "../index";

describe("<QuizQuestion />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<QuizQuestion />)).toMatchSnapshot();
  });
});
