import React from 'react';
import { shallow } from 'enzyme';
import SessionLink from '../index';

describe('<SessionLink />', () => {
  it('should match baseline snapshot', () => {
    expect(shallow(<SessionLink text="Continue Session" to="/reviews" />)).toMatchSnapshot();
  });
  it('should adopt color and count props', () => {
    const renderedComponent = shallow(
      <SessionLink text="Continue Session" to="/reviews" color="purple" count={88} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
