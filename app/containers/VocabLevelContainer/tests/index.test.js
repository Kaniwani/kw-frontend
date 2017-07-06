import React from 'react';
import { mount } from 'enzyme';
import VocabLevelContainer from '../index';

describe('<VocabLevelContainer />', () => {
  it('should match baseline snapshot', () => {
    expect(mount(<VocabLevelContainer />)).toMatchSnapshot();
  });
});
