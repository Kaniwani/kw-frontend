import "jest-styled-components";
import React from "react";
import { shallow } from "enzyme";
import StripeHeading from "../index";

describe("<StripeHeading />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<StripeHeading text="Apprentice" />)).toMatchSnapshot();
  });
  it("should adopt a count prop", () => {
    expect(shallow(<StripeHeading text="Apprentice" count={22} />)).toMatchSnapshot();
  });
  it("should still render a count prop if 0", () => {
    expect(shallow(<StripeHeading text="Apprentice" count={0} />)).toMatchSnapshot();
  });
});
