import React from 'react';
import { shallow } from 'enzyme';
import SiteNav from '../index';

describe('<SiteNav />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SiteNav />)).toMatchSnapshot();
  });
});
