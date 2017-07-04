import React from 'react';
import { shallow } from 'enzyme';
import SessionSummaryContent from '../index';

describe('<SessionSummaryContent />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SessionSummaryContent />)).toMatchSnapshot();
  });
});
