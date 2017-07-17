import React from 'react';
import { shallow } from 'enzyme';
import VocabEntryLinks from '../index';

describe('<VocabEntryLinks />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabEntryLinks />)).toMatchSnapshot();
  });
});
