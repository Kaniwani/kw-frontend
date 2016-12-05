import { shallow, render } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';
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
    expect(renderedComponent.contains(<LoadingIndicator />)).toBe(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = render(
      <HomePage
        loading={false}
        error={{ message: 'Loading failed!' }}
        loadUserData={noop}
      />,
    );
    expect(renderedComponent.text()).toContain('went wrong');
  });

  it('should render the userData if loading was successful', () => {
    const user = {
      name: 'testname',
      level: 3,
      reviewCount: 2,
      lastWkSyncDate: new Date(),
    };
    const renderedComponent = render(
      <HomePage
        loading={false}
        error={false}
        user={user}
        loadUserData={noop}
      />,
    );
    expect(renderedComponent.text()).toContain('Welcome Back testname');
    expect(renderedComponent.text()).toContain('You are level 3');
    expect(renderedComponent.text()).toContain('You have 2 reviews waiting');
    expect(renderedComponent.text()).toContain(`You last synced with WK on ${user.lastWkSyncDate.toDateString()}`);
  });
});
