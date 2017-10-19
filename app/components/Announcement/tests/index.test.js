import React from 'react';
import { shallow } from 'enzyme';
import Announcements from '../index';

describe('<Announcements />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<Announcements />)).toMatchSnapshot();
  });
});
