import React from 'react';
import { shallow } from 'enzyme';

import ExpandingSearch from '../index';

describe('<ExpandingSearch />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ExpandingSearch
        handleInputChange={jest.fn()}
        handleInputFocus={jest.fn()}
        inputRef={jest.fn()}
        inputValue="検索"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt props', () => {
    const renderedComponent = shallow(
      <ExpandingSearch
        handleInputChange={jest.fn()}
        handleInputFocus={jest.fn()}
        inputRef={jest.fn()}
        inputValue="検索"
        isExpanded
        isSubmitting
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
