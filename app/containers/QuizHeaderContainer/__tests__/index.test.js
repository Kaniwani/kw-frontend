import "jest-styled-components";
import React from "react";
import { shallow } from "enzyme";
import QuizHeader from "../index";

describe("<QuizHeader />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<QuizHeader />)).toMatchSnapshot();
  });
});
