import React from 'react';
import { shallow } from 'enzyme';
import ToggleVocabListButton from '../index';

describe('<ToggleVocabListButton />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ToggleVocabListButton
        isExpanded
        handleClick={jest.fn()}
      />
     );

    expect(renderedComponent).toMatchSnapshot();
  });
});
