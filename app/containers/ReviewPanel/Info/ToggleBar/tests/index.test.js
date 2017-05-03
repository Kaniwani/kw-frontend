import React from 'react';
import { shallow } from 'enzyme';
import ToggleBar from '../index';

describe('<ToggleBar />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ToggleBar
        handleNotesClick={jest.fn()}
        handleInfoClick={jest.fn()}
        handleSynonymClick={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should adopt optional props', () => {
    const renderedComponent = shallow(
      <ToggleBar
        handleNotesClick={jest.fn()}
        handleInfoClick={jest.fn()}
        handleSynonymClick={jest.fn()}
        detailLevel="HIGH"
        isDisabled={false}
        notes={{ isActive: true }}
        info={{ isActive: false }}
        addSynonym={{ isActive: true }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
