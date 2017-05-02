import React from 'react';
import { shallow } from 'enzyme';
import { PARTS_OF_SPEECH } from 'shared/constants';
import SynonymHeader from '../index';

describe('<SynonymHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <SynonymHeader
        handleRemoveSynonym={jest.fn()}
        tags={PARTS_OF_SPEECH.slice(0, 10)}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
