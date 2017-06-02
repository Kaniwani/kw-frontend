import { shallow, mount, render } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import A from '../index';
const href = 'http://google.com/';

describe('<A />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <A href={href} plainLink><h1>child</h1></A>
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have an "href" attribute when passed prop', () => {
    const renderedComponent = shallow(
      <A href={href} />
    );
    expect(renderedComponent.prop('href')).toEqual(href);
  });

  it('should have a "to" attribute when passed prop', () => {
    const to = '/internal/to';
    // react-router Link needs a parent router to render
    const renderedComponent = mount(
      <MemoryRouter>
        <A to={to} />
      </MemoryRouter>
    );
    expect(renderedComponent.find(A).prop('to')).toEqual(to);
  });

  it('should add appropriate attributes for an external link', () => {
    const renderedComponent = render(
      <A href={href} external />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
