import splitSentenceByMatch from '../splitSentenceByMatch';

describe('splitSentenceByMatch()', () => {
  it('should have a safe default', () => {
    expect(splitSentenceByMatch()).toEqual({ head: '', match: '', tail: '' });
  });

  it('should match kanji', () => {
    expect(splitSentenceByMatch('head日本', '日本')).toMatchSnapshot();
    expect(splitSentenceByMatch('日本tail', '日本')).toMatchSnapshot();
    expect(splitSentenceByMatch('head日本tail', '日本')).toMatchSnapshot();
  });

  it('should match kana', () => {
    expect(splitSentenceByMatch('headにちtail', 'にち')).toMatchSnapshot();
    expect(splitSentenceByMatch('にちtail', 'にち')).toMatchSnapshot();
    expect(splitSentenceByMatch('headにち', 'にち')).toMatchSnapshot();
  });

  it('should match partial kanji', () => {
    expect(splitSentenceByMatch('食べました', '食べる')).toMatchSnapshot();
    expect(splitSentenceByMatch('これを食べました', '食べる')).toMatchSnapshot();
  });
});
