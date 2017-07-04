import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import SessionPage from '../index';

describe('<SessionPage />', () => {
  let store;
  const initialState = {
    sessionPageItem: 'from sessionPage state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <SessionPage />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
