import React from 'react';
import { render } from 'enzyme';
import SentencePair from '../index';

describe('<SentencePair />', () => {
  it('should match baseline snapshot', () => {
    const renderedComponent = render(
      <SentencePair
        sentenceJA="その言葉の漢字は難しい"
        sentenceEN="This sentence's phrase is difficult"
        character="漢字"
        kana="かんじ"
      />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
