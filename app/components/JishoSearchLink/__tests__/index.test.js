import "jest-styled-components";
import React from "react";
import { render } from "enzyme";

import JishoSearchLink from "../index";

describe("<JishoSearchLink />", () => {
  it("should match base snapshot", () => {
    const renderedComponent = render(<JishoSearchLink keyword="かな" />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
