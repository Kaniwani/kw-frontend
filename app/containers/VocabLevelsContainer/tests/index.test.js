import React from 'react';
import { mount } from 'enzyme';
import VocabLevelsContainer from '../index';

describe('<VocabLevelsContainer />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabLevelsContainer />)).toMatchSnapshot();
  });
});
