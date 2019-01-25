import {
  increment,
  decrement,
  isInputValid,
  containsZenkakuLatin,
  matchAnswer,
  fixTerminalN,
  fixHandwriting,
} from '../utils';

describe('increment', () => {
  it('sane defaults', () => {
    expect(increment()).toBe(1);
  });
  it('works', () => {
    expect(increment(-2)).toBe(-1);
    expect(increment(-1)).toBe(0);
    expect(increment(0)).toBe(1);
    expect(increment(1)).toBe(2);
  });
});

describe('decrement', () => {
  it('sane defaults', () => {
    expect(decrement()).toBe(0);
  });
  it('works', () => {
    expect(decrement(3)).toBe(2);
    expect(decrement(2)).toBe(1);
    expect(decrement(1)).toBe(0);
    expect(decrement(0)).toBe(0);
    expect(decrement(-1)).toBe(0);
  });
});

describe('containsZenkaku', () => {
  it('sane defaults', () => {
    expect(containsZenkakuLatin()).toBe(false);
  });
  it('works', () => {
    expect(containsZenkakuLatin('abc')).toBe(false);
    expect(containsZenkakuLatin('か12')).toBe(false);
    expect(containsZenkakuLatin('か０４')).toBe(false);
    expect(containsZenkakuLatin('ａｂｃ')).toBe(true);
    expect(containsZenkakuLatin('ＡＢＣ')).toBe(true);
    expect(containsZenkakuLatin('abcｄ')).toBe(true);
    expect(containsZenkakuLatin('かｄ')).toBe(true);
  });
});

describe('isInputValid', () => {
  it('sane defaults', () => {
    expect(isInputValid()).toBe(false);
  });
  it('works', () => {
    expect(isInputValid('')).toBe(false);
    expect(isInputValid('n')).toBe(false);
    expect(isInputValid('かなa')).toBe(false);
    expect(isInputValid('かなA')).toBe(false);
    expect(isInputValid('かなａ')).toBe(false); // zenkaku
    expect(isInputValid('2011ねん')).toBe(true);
    expect(isInputValid('2011年')).toBe(true);
    expect(isInputValid('２０１１ねん')).toBe(true);
    expect(isInputValid('２０１１年')).toBe(true);
    expect(isInputValid('かな')).toBe(true);
    expect(isInputValid('漢字')).toBe(true);
    expect(isInputValid('送り仮名')).toBe(true);
  });
});

describe('matchAnswer', () => {
  it('sane defaults', () => {
    expect(matchAnswer()).toBe('');
    expect(matchAnswer('')).toBe('');
    expect(matchAnswer('', [])).toBe('');
  });

  it('simple cases', () => {
    const vocab = [
      { word: 'ビー玉', primaryReading: 'びーだま', secondaryReadings: ['ビーだま', 'カタカナ'] },
      { word: '日本', primaryReading: 'にほん', secondaryReadings: ['にっぽん'] },
      { word: '四', primaryReading: 'よん', secondaryReadings: [] },
      { word: '２０１１年', primaryReading: '２０１１ねん', secondaryReadings: [] },
    ];
    // prettier-ignore
    const synonyms = [
      { word: "天国", primaryReading: "てんごく" },
      { word: "丸い", primaryReading: "まるい" },
    ];
    expect(matchAnswer(vocab[0].word, [vocab, synonyms])).toBe(vocab[0].word);
    expect(matchAnswer(vocab[1].word, [vocab, synonyms])).toBe(vocab[1].word);
    expect(matchAnswer(vocab[2].word, [vocab, synonyms])).toBe(vocab[2].word);
    expect(matchAnswer(vocab[0].primaryReading, [vocab, synonyms])).toBe(vocab[0].word);
    expect(matchAnswer(vocab[1].primaryReading, [vocab, synonyms])).toBe(vocab[1].word);
    expect(matchAnswer(vocab[2].primaryReading, [vocab, synonyms])).toBe(vocab[2].word);
    expect(matchAnswer(vocab[0].secondaryReadings[0], [vocab, synonyms])).toBe(vocab[0].word);
    expect(matchAnswer(vocab[0].secondaryReadings[1], [vocab, synonyms])).toBe(vocab[0].word);
    expect(matchAnswer(vocab[1].secondaryReadings[0], [vocab, synonyms])).toBe(vocab[1].word);
    expect(matchAnswer(synonyms[0].word, [vocab, synonyms])).toBe(synonyms[0].word);
    expect(matchAnswer(synonyms[0].primaryReading, [vocab, synonyms])).toBe(synonyms[0].word);
    expect(matchAnswer(synonyms[1].word, [vocab, synonyms])).toBe(synonyms[1].word);
    expect(matchAnswer(synonyms[1].primaryReading, [vocab, synonyms])).toBe(synonyms[1].word);
  });

  it('match regardless of answer tilde presence', () => {
    expect(matchAnswer('間', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('間〜', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('間~', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('かん', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('かん〜', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('かん~', [[{ word: '間〜', primaryReading: ['かん'] }]])).toBe('間〜');
    expect(matchAnswer('放題', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
    expect(matchAnswer('〜放題', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
    expect(matchAnswer('~放題', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
    expect(matchAnswer('ほうだい', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
    expect(matchAnswer('〜ほうだい', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
    expect(matchAnswer('~ほうだい', [[{ word: '〜放題', primaryReading: ['〜ほうだい'] }]])).toBe(
      '〜放題'
    );
  });

  it('should not partial match', () => {
    expect(matchAnswer('やく', [[{ word: '約束', primaryReading: ['やくそく'] }]])).toBe('');
  });

  it('should match accidental katakana "ta" masquerading as kanji "夕" (ゆう)', () => {
    expect(matchAnswer('タべ', [[{ word: '夕べ', primaryReading: ['ゆうべ'] }]])).toBe('夕べ');
  });
});

describe('fixTerminalN', () => {
  it('sane defaults', () => {
    expect(fixTerminalN()).toBe('');
    expect(fixTerminalN('')).toBe('');
  });

  it('fix trailing english "n"', () => {
    expect(fixTerminalN('かn')).toBe('かん');
  });

  it('fix trailing japanese zenkaku "ｎ"', () => {
    expect(fixTerminalN('かｎ')).toBe('かん');
  });

  it('pass through input otherwise', () => {
    expect(fixTerminalN('かん')).toBe('かん');
    expect(fixTerminalN('かs')).toBe('かs');
  });
});

describe('fixHandwriting', () => {
  it('sane defaults', () => {
    expect(fixHandwriting()).toBe('');
    expect(fixHandwriting('')).toBe('');
  });

  it('replaces masquerading katakana', () => {
    expect(fixHandwriting('人ロ')).toBe('人口');
    expect(fixHandwriting('ー人')).toBe('一人');
    expect(fixHandwriting('ニ十日')).toBe('二十日');
  });
});
