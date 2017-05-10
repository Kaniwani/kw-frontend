import React from 'react';
import { shallow } from 'enzyme';
import VocabCardList from '../index';

describe('<VocabCardList />', () => {
  const items = [
    {
      id: 12,
      meaning: 'Before Long, Soon',
      readings: [
        {
          character: '近々',
          kana: 'ちかぢか, きんきん, ちかじか',
        },
        {
          character: '間もなく',
          kana: 'まもなく',
        },
      ],
    },
    {
      id: 234,
      meaning: 'emergency',
      readings: [
        {
          kana: 'ひじょう',
          character: '非常',
        },
        {
          kana: 'きゅうきゅう',
          character: '救急',
        },
        {
          kana: 'きんきゅう',
          character: '緊急',
        },
      ],
    },
  ];

  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabCardList items={items} />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt a color prop', () => {
    const renderedComponent = shallow(
      <VocabCardList items={items} color="blue" />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
