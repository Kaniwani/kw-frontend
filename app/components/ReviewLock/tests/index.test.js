import React from 'react';
import { shallow } from 'enzyme';
import VocabEntryLock from '../index';

describe('<VocabEntryLock />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabEntryLock />)).toMatchSnapshot();
  });
});
