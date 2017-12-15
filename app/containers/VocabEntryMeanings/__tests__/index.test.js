import React from "react";
import { shallow } from "enzyme";
import VocabEntryMeanings from "../index";

describe("<VocabEntryMeanings />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<VocabEntryMeanings />)).toMatchSnapshot();
  });
});
