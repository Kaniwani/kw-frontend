import React from "react";
import { mount } from "enzyme";
import AboutPage from "../index";

describe("<AboutPage />", () => {
  it("should match baseline snapshot", () => {
    expect(mount(<AboutPage />)).toMatchSnapshot();
  });
});
