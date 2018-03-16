import 'jest-styled-components';
import React from 'react';
import { render } from 'enzyme';
import StreakIcon from '../index';

describe('<StreakIcon />', () => {
  it('should match baseline snapshot', () => {
    expect(render(<StreakIcon />)).toMatchSnapshot();
  });
  it('should adapt to streakName', () => {
    expect(render(<StreakIcon streakName="GURU" />)).toMatchSnapshot();
  });
  it('should render appropriate streakName color', () => {
    expect(render(<StreakIcon streakName="GURU" colored />)).toMatchSnapshot();
  });
  it('should adapt to streak number', () => {
    expect(render(<StreakIcon streak={3} />)).toMatchSnapshot();
  });
  it('should render appropriate streak color', () => {
    expect(render(<StreakIcon streak={6} colored />)).toMatchSnapshot();
  });
});
