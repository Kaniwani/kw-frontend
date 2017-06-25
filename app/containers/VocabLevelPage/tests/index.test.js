import React from 'react';
import { mount } from 'enzyme';
import VocabLevelPage from '../index';

describe('<VocabLevelPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabLevelPage />)).toMatchSnapshot();
  });
});
