import "jest-styled-components";
import React from "react";
import { render } from "enzyme";
import IconButton from "../index";

describe("<IconButton /> ", () => {
  it("should match baseline snapshot", () => {
    const renderedComponent = render(<IconButton name="ADD" title="Does an action" />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it("should adopt button types", () => {
    const renderedComponent = render(
      <IconButton
        type="submit"
        name="ADD"
        title="Does an action"
        handleClick={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
