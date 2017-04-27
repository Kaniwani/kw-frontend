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
});
