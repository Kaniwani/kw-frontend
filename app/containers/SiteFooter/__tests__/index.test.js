import "jest-styled-components";
import React from "react";
import { render } from "enzyme";
import SiteFooter from "../index";

describe("<SiteFooter />", () => {
  it("should match baseline snapshot", () => {
    expect(render(<SiteFooter />)).toMatchSnapshot();
  });
});
