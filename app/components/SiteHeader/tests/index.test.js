import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from '../index';

describe('<SiteHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
