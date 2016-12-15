import { shallow } from 'enzyme';
import React from 'react';

import DashboardHeader from '../index';

describe('<DashboardHeader />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <DashboardHeader />,
    );
    expect(renderedComponent.find('header').length).toEqual(1);
  });
});
