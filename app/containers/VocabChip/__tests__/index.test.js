import React from "react";
import { shallow } from "enzyme";
import VocabChip from "../index";

describe("<VocabChip />", () => {
  it("should match baseline snapshot", () => {
    const renderedComponent = shallow(<VocabChip id={42} character="蟹鰐" />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should adopt a color prop", () => {
    const renderedComponent = shallow(
      <VocabChip id={42} character="蟹鰐" color="orange" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
