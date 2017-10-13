import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-logic-test';
import SettingsPage from '../index';

describe('<SettingsPage />', () => {
  let store;
  const initialState = {
    settingsPageItem: 'from settingsPage state',
  };

  beforeEach(() => {
    store = createMockStore({ initialState });
  });

  it('should match baseline snapshot', () => {
    const component = mount(
      <Provider store={store}>
        <SettingsPage />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
