import React from 'react';
import { shallow } from 'enzyme';
import QuizSummaryContent from '../index';

describe('<QuizSummaryContent />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<QuizSummaryContent />)).toMatchSnapshot();
  });
});
