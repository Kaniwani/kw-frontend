import React from 'react';
import { shallow } from 'enzyme';
import SrsDonut from '../index';

describe('<SrsDonut />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SrsDonut />)).toMatchSnapshot();
  });
});
