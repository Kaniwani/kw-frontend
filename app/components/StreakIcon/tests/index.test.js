import React from 'react';
import { shallow } from 'enzyme';
import StreakIcon from '../index';

describe('<StreakIcon />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<StreakIcon />)).toMatchSnapshot();
  });
});
