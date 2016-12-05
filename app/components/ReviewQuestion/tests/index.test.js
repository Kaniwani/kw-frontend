import ReviewQuestion from '../index';

import { shallow, render } from 'enzyme';
import React from 'react';

describe('<ReviewQuestion />', () => {
  it('should render LoadingIndicator when loading', () => {
    const renderedComponent = shallow(
      <ReviewQuestion loading error={false} meaning="" />,
    );
    expect(renderedComponent.find('LoadingIndicator')).toBeDefined();
  });

  it('should render meaning text when passed required props', () => {
    const renderedComponent = render(
      <ReviewQuestion loading={false} error={false} meaning="test" />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render error message instead of meaning when error present', () => {
    const renderedComponent = render(
      <ReviewQuestion loading={false} error={{ message: 'fhqwhqgads' }} meaning="test" />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
