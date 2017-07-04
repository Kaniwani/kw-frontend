import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import SessionRoutes from '../index';

describe('<SessionRoutes />', () => {
  let store;
  const initialState = {
    sessionRoutesItem: 'from sessionRoutes state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <SessionRoutes />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
