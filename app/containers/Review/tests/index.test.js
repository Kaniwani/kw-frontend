import { Review } from '../index';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Review />', () => {
  it('Expect it to render with required props', () => {
    const renderedComponent = shallow(
      <Review
        loading={false}
        error={false}
        vocab={{}}
        meaning="text"
        loadReviewData={() => {}}
      />,
    );
    expect(renderedComponent).toBeDefined();
  });

  it('Expect it not to render with missing required props', () => {
    const renderedComponent = shallow(
      <Review
        loading={false}
        error={false}
        meaning=""
        loadReviewData={() => {}}
      />,
    );
    expect(renderedComponent).toThrow();
  });
});
