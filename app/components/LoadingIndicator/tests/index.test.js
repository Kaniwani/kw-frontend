import { render } from 'enzyme';
import React from 'react';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 13 divs', () => {
    const renderedComponent = render(
      <LoadingIndicator />
    );
    expect(renderedComponent.find('div').length).toBe(13);
  });
});
