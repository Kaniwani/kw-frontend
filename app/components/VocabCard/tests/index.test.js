import React from 'react';
import { shallow } from 'enzyme';

import VocabCard from '../index';

describe('<VocabCard />', () => {
  const id = 234;
  const meaning = 'Before Long, Soon';
  const readings = [
    {
      character: '近々',
      kana: 'ちかぢか, きんきん, ちかじか',
    },
    {
      character: '間もなく',
      kana: 'まもなく',
    },
  ];

  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabCard
        id={id}
        meaning={meaning}
        readings={readings}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt color prop', () => {
    const renderedComponent = shallow(
      <VocabCard
        id={id}
        meaning={meaning}
        readings={readings}
        color="orange"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
