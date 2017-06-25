import React from 'react';
import { mount } from 'enzyme';
import VocabEntryPage from '../index';

describe('<VocabEntryPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabEntryPage />)).toMatchSnapshot();
  });
});
