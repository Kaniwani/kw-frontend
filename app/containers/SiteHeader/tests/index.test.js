import 'jest-styled-components';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import { MemoryRouter } from 'react-router-dom';
import { initialState } from 'shared/reducers';
import SiteHeader from '../index';

describe('<SiteHeader />', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({ initialState: { ...initialState, route: { location: '' } } });
  });

  it('should match baseline snapshot', () => {
    const component = render(<Provider store={store}><MemoryRouter><SiteHeader /></MemoryRouter></Provider>);
    expect(component).toMatchSnapshot();
  });
});
