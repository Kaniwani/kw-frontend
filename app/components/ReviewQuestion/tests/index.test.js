import ReviewQuestion from '../index';
import Wrapper from '../Wrapper';
import Meaning from '../Meaning';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<ReviewQuestion />', () => {
  it('should render its wrapper', () => {
    const renderedComponent = shallow(
      <ReviewQuestion meaning="test" />
    );
    expect(renderedComponent.find(Wrapper)).toExist();
  });
});

describe('<Meaning />', () => {
  it('should render its prop as text', () => {
    const text = 'test';
    const renderedComponent = shallow(
      <Meaning meaning={text} />
    );
    expect(renderedComponent.contains(text)).toEqual(true);
  });
});
