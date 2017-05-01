import React from 'react';
import { shallow } from 'enzyme';
import ToggleBar from '../index';

describe('<ToggleBar />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ToggleBar
        showNotesPanel={jest.fn()}
        showSynonymPanel={jest.fn()}
        showInfoPanel={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt optional props', () => {
    const renderedComponent = shallow(
      <ToggleBar
        showNotesPanel={jest.fn()}
        showSynonymPanel={jest.fn()}
        showInfoPanel={jest.fn()}
        detailLevel="HIGH"
        isDisabled
        notes={{ isActive: true }}
        info={{ isActive: false }}
        synonym={{ isActive: true }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
