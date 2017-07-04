import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import SiteHeader from '../index';

describe('<SiteHeader />', () => {
  let store;
  const initialState = {
    siteHeaderItem: 'from siteHeader state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <SiteHeader />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
