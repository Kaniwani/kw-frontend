import React from 'react';
import { shallow } from 'enzyme';
import MaskedSentence from '../index';

describe('<MaskedSentence />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<MaskedSentence />)).toMatchSnapshot();
  });
});
