import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import BackgroundImg from '../index';

describe('<BackgroundImg />', () => {
  it('should render with an imgSrc prop', () => {
    const renderedComponent = shallow(
      <BackgroundImg imgSrc={'http://fillmurray.com/400/800'} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt a bgSize prop = contain', () => {
    const renderedComponent = shallow(
      <BackgroundImg imgSrc={'http://fillmurray.com/400/800'} bgSize="contain" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt a bgPosition prop = bottom right', () => {
    const renderedComponent = shallow(
      <BackgroundImg imgSrc={'http://fillmurray.com/400/800'} bgPosition="bottom right" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
