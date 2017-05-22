import React from 'react';
import { shallow } from 'enzyme';
import ToggleVocabListType from '../index';

describe('<ToggleVocabListType />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ToggleVocabListType
        isExpanded
        handleClick={jest.fn()}
      />
     );

    expect(renderedComponent).toMatchSnapshot();
  });
});
