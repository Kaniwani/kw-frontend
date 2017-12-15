import "jest-styled-components";
import { render } from "enzyme";
import React from "react";
import LoadingCrabigator from "../index";

describe("<LoadingCrabigator />", () => {
  it("should match snapshot", () => {
    const renderedComponent = render(<LoadingCrabigator />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
