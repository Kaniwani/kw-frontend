import React from "react";
import { shallow } from "enzyme";
import VocabEntryReadings from "../index";

describe("<VocabEntryReadings />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<VocabEntryReadings />)).toMatchSnapshot();
  });
});
