import React from 'react';
import { mount } from 'enzyme';
import VocabLevelsPage from '../index';

describe('<VocabLevelsPage />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabLevelsPage />)).toMatchSnapshot();
  });
});
