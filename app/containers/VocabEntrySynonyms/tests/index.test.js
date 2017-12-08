import React from 'react';
import { shallow } from 'enzyme';
import VocabEntrySynonyms from '../index';

describe('<VocabEntrySynonyms />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<VocabEntrySynonyms />)).toMatchSnapshot();
  });
});
