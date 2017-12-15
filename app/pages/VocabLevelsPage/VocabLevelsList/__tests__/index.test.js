import "jest-styled-components";
import React from "react";
import { render } from "enzyme";

import { levels } from "shared/testTables";
import VocabLevelsList from "../index";

describe("<VocabLevelsList />", () => {
  it("should match baseline snapshot", () => {
    const renderedComponent = render(
      <VocabLevelsList levelIds={levels.slice(30, 38).map(({ level }) => level)} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
