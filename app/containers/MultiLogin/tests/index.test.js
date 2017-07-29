import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import MultiLogin from '../index';

describe('<MultiLogin />', () => {
  let store;
  const initialState = {
    multiLoginItem: 'from multiLogin state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <MultiLogin />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
