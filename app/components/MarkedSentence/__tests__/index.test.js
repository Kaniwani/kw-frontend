import "jest-styled-components";
import React from "react";
import { render } from "enzyme";
import MarkedSentence from "../index";

describe("<MarkedSentence />", () => {
  it("should match baseline snapshot", () => {
    const renderedComponent = render(
      <MarkedSentence sentence="その言葉の漢字は難しい" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should match character snapshot", () => {
    const renderedComponent = render(
      <MarkedSentence
        sentence="その言葉の漢字は難しい"
        character="漢字"
        reading="かんじ"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should match reading snapshot", () => {
    const renderedComponent = render(
      <MarkedSentence sentence="その言葉の漢字は難しい" reading="その" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
