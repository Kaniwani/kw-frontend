import React from 'react';
import { shallow } from 'enzyme';

import ReactTooltip from 'react-tooltip';

import Routes from 'routes';

import { App } from '../index';

describe('<App />', () => {
  it('should render a global ReactTooltip', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(ReactTooltip).length).toBe(1);
  });

  it('should render routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Routes).length).toBe(1);
  });
});
