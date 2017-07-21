import { render } from 'enzyme';
import React from 'react';
import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render an svg', () => {
    const renderedComponent = render(
      <LoadingIndicator />
    );
    expect(renderedComponent.find('svg').length).toBe(1);
  });
});
