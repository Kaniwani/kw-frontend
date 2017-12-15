import React from "react";
import { shallow } from "enzyme";

import NotFoundPage from "../index";

describe("<NotFoundPage />", () => {
  it("should render the 404 page", () => {
    const renderedComponent = shallow(<NotFoundPage />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
