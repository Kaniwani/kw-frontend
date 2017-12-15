import React from "react";
import { mount } from "enzyme";
import ContactPage from "../index";

describe("<ContactPage />", () => {
  it("should match baseline snapshot", () => {
    expect(mount(<ContactPage />)).toMatchSnapshot();
  });
});
