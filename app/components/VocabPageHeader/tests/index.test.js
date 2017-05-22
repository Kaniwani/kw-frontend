import React from 'react';
import { shallow } from 'enzyme';
import VocabPageHeader from '../index';

describe('<VocabPageHeader />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabPageHeader
        pageTitle="Vocabulary > Levels > 24"
        vocabListExpanded={false}
        handleToggleVocabList={jest.fn()}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
