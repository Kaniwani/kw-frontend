/**
 * Testing the NotFoundPage
 */

import { shallow } from 'enzyme';
import React from 'react';

import NotFound from '../index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />,
    );
    expect(renderedComponent.contains(
      <h1>
        Page not found!
      </h1>)).toBe(true);
  });
});
