import 'jest-styled-components';
import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import IconLink from '../index';

describe('<IconLink /> ', () => {
  const props = { name: 'ADD', title: 'Does an action' };
  it('renders an Anchor with "href"', () => {
    const renderedComponent = render(<MemoryRouter><IconLink href="http://google.com" {...props} /></MemoryRouter>);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('renders a Link with "to"', () => {
    const renderedComponent = render(<MemoryRouter><IconLink to="/path" {...props} /></MemoryRouter>);
    expect(renderedComponent).toMatchSnapshot();
  });
});
