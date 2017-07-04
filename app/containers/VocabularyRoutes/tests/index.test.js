import React from 'react';
import { mount } from 'enzyme';
import VocabularyPage from '../index';

describe('<VocabularyPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabularyPage />)).toMatchSnapshot();
  });
});
