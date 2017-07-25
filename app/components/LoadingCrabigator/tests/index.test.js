import { render } from 'enzyme';
import React from 'react';
import LoadingCrabigator from '../index';

describe('<LoadingCrabigator />', () => {
  it('should render an svg', () => {
    const renderedComponent = render(
      <LoadingCrabigator />
    );
    expect(renderedComponent.find('svg').length).toBe(1);
  });
});
