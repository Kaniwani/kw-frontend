import React from 'react';
import { shallow } from 'enzyme';
import SessionSummaryHeader from '../index';

describe('<SessionSummaryHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <SessionSummaryHeader
        category="review"
        linkRoute="/reviews"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match adopt count prop', () => {
    const renderedComponent = shallow(
      <SessionSummaryHeader
        category="lesson"
        linkRoute="/lessons"
        count={22}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
