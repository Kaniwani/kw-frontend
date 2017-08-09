import React from 'react';
import { shallow } from 'enzyme';
import SiteFooter from '../index';

describe('<SiteFooter />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SiteFooter />)).toMatchSnapshot();
  });
});
