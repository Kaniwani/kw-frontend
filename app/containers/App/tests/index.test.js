import App from '../index';
import DashboardHeader from 'components/DashboardHeader';
import Footer from 'components/Footer';

import { shallow } from 'enzyme';
import React from 'react';

describe('<App />', () => {
  it('should render the header', () => {
    const renderedComponent = shallow(
      <App />,
    );
    expect(renderedComponent.find(DashboardHeader)).toBeDefined();
  });

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render the footer', () => {
    const renderedComponent = shallow(
      <App />,
    );
    expect(renderedComponent.find(Footer)).toBeDefined();
  });
});
