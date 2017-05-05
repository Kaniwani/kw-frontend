import React from 'react';
import { render } from 'enzyme';
import IconLink from '../index';

describe('<IconLink /> ', () => {
  it('should match baseline snapshot of anchor', () => {
    const renderedComponent = render(
      <IconLink name="ADD" title="Does an action" href="http://google.com" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match baseline snapshot of react-router Link', () => {
    const renderedComponent = render(
      <IconLink name="ADD" title="Does an action" to="/path" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
