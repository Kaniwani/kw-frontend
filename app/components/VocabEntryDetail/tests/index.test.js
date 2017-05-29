import React from 'react';
import { shallow } from 'enzyme';
import VocabEntryDetail from '../index';

describe('<VocabEntryDetail />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabEntryDetail />)).toMatchSnapshot();
  });
});
