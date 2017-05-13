import React from 'react';
import { shallow } from 'enzyme';
import VocabLevelList from '../index';

describe('<VocabLevelList />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabLevelList />)).toMatchSnapshot();
  });
});
