import React from 'react';
import { render } from 'enzyme';

import SiteNav from '../index';

describe('<SiteNav />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = render(
      <SiteNav />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
