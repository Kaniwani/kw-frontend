import { shallow } from 'enzyme';
import React from 'react';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <Header />,
    );
    expect(renderedComponent.find('header').length).toEqual(1);
  });
});
