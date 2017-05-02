import React from 'react';
import { shallow } from 'enzyme';
import { PARTS_OF_SPEECH } from 'shared/constants';
import ReadingHeader from '../index';

describe('<ReadingHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <ReadingHeader
        wkVocabLink="#"
        kwVocabLink="#"
        tags={PARTS_OF_SPEECH.slice(0, 10)}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
