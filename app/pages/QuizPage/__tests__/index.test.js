import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { createMockStore } from "redux-logic-test";
import QuizPage from "../index";

describe("<QuizPage />", () => {
  let store;
  const initialState = {
    sessionPageItem: "from sessionPage state",
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it("should match baseline snapshot", () => {
    const component = mount(
      <Provider store={store}>
        <QuizPage />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
