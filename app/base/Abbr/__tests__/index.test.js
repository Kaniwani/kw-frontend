import "jest-styled-components";
import { shallow } from "enzyme";
import React from "react";

import Abbr from "../index";

describe("<Abbr />", () => {
  const [title, text] = ["How To Meet Ladies", "HTML"];
  const renderedComponent = shallow(<Abbr title={title}>{text}</Abbr>);

  it("should match snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it("should have a title attribute", () => {
    expect(renderedComponent.prop("title")).toEqual(title);
  });
});
