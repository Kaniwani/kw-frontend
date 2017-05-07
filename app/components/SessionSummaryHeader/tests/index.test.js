import React from 'react';
import { shallow } from 'enzyme';
import SessionSummaryHeader from '../index';

describe('<SessionSummaryHeader />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SessionSummaryHeader />)).toMatchSnapshot();
  });
});
