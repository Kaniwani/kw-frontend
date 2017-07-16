import React from 'react';
import { shallow } from 'enzyme';
import QuizSummaryContent from '../index';

describe('<QuizSummaryContent />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <QuizSummaryContent
        category="review"
        linkRoute="/reviews"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match adopt count prop', () => {
    const renderedComponent = shallow(
      <QuizSummaryContent
        category="lesson"
        linkRoute="/lessons"
        count={22}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
