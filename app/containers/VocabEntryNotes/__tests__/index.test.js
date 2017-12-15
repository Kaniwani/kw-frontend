import React from "react";
import { shallow } from "enzyme";
import VocabEntryNotes from "../index";

describe("<VocabEntryNotes />", () => {
  it("should match baseline snapshot", () => {
    expect(shallow(<VocabEntryNotes />)).toMatchSnapshot();
  });
});
