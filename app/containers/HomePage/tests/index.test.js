import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';

const noop = () => { /* nada */ };

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage
        loading
        loadUserData={noop}
      />,
    );
    expect(renderedComponent.contains(<LoadingIndicator />).toBe(true));
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <HomePage
        loading={false}
        error={{ message: 'Loading failed!' }}
        loadUserData={noop}
      />,
    );
    expect(
      renderedComponent
        .text()
        .indexOf('Something went wrong, please try again!'),
      ).toBeGreaterThan(-1);
  });

  it('should render the userData if loading was successful', () => {
    const user = {
      name: 'testname',
      level: 3,
      reviewCount: 2,
      lastWkSyncDate: new Date(),
    };
    const renderedComponent = shallow(
      <HomePage
        user={user}
        loadUserData={noop}
      />,
    );

    expect(renderedComponent.contains(
      <div>
        <H2>Welcome Back testname.</H2>
        <p>You are level 3.</p>
        <p>You have 2 reviews waiting.</p>
        <p>You last synced with WK on {new Date().toDateString()}.</p>
      </div>,
    )).toBe(true);
  });
});
