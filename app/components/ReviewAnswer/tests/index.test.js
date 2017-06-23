import 'jest-styled-components';
import React from 'react';
import { mount } from 'enzyme';
import ReviewAnswer from '../index';

describe('<ReviewAnswer />', () => {
  it('should match baseline snapshot', () => {
    const component = mount(
      <ReviewAnswer
        inputFieldValue="正解"
        inputFieldRef={jest.fn()}
        handleSubmit={jest.fn()}
        handleIgnore={jest.fn()}
        handleInput={jest.fn()}
      />);
    expect(component).toMatchStyledComponentsSnapshot();
  });
});
