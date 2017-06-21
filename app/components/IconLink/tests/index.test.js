import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import IconLink from '../index';

describe('<IconLink /> ', () => {
  it('should match baseline snapshot of anchor', () => {
    const renderedComponent = render(
      <MemoryRouter>
        <IconLink name="ADD" title="Does an action" href="http://google.com" />
      </MemoryRouter>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match baseline snapshot of react-router Link', () => {
    const renderedComponent = render(
      <MemoryRouter>
        <IconLink name="ADD" title="Does an action" to="/path" />
      </MemoryRouter>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
