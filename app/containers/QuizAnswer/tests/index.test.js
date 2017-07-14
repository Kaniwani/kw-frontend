import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import QuizAnswer from '../index';

describe('<QuizAnswer />', () => {
  let store;
  const initialState = {
    quizAnswerItem: 'from quizAnswer state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <QuizAnswer />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
