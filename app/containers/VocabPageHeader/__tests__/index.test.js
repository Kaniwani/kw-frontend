import "jest-styled-components";
import React from "react";
import { render } from "enzyme";
import VocabPageHeader from "../index";

describe("<VocabPageHeader />", () => {
  it("should match baseline snapshot", () => {
    const renderedComponent = render(
      <VocabPageHeader
        pageTitle="Vocabulary > Levels > 24"
        withVocabListToggle
        cardsExpanded={false}
        toggleCardsExpanded={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
