import React from 'react';
import { shallow } from 'enzyme';
import VocabEntry from '../index';

describe('<VocabEntry />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabEntry />)).toMatchSnapshot();
  });
});
