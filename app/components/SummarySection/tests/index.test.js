import React from 'react';
import { shallow } from 'enzyme';
import SummarySection from '../index';

describe('<SummarySection />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SummarySection />)).toMatchSnapshot();
  });
});
