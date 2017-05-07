import React from 'react';
import { shallow } from 'enzyme';
import VocabChipList from '../index';

describe('<VocabChipList />', () => {
  const items = [
    {
      id: 42,
      meaning: 'facilities',
      kana: 'しせつ',
      character: '施設',
      correctPercent: 82,
    },
    {
      id: 22,
      meaning: 'dancing',
      kana: 'おどり',
      character: '踊り',
      correctPercent: 95,
    },
  ];


  it('should match baseline snapshot', () => {
    const renderedComponent = shallow(
      <VocabChipList
        items={items}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should adopt a color prop', () => {
    const renderedComponent = shallow(
      <VocabChipList
        items={items}
        color="green"
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
