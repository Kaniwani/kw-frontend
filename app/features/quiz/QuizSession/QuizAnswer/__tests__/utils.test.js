import {
  increment,
  decrement,
  isInputValid,
  containsZenKaku,
  matchAnswer,
  fixTerminalN,
  combineAnswers,
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
    expect(containsZenKaku()).toBe(false);
  });
  it('works', () => {
    expect(containsZenKaku('abc')).toBe(false);
    expect(containsZenKaku('ａｂｃ')).toBe(true);
    expect(containsZenKaku('ＡＢＣ')).toBe(true);
    expect(containsZenKaku('abcｄ')).toBe(true);
    expect(containsZenKaku('かｄ')).toBe(true);
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
    expect(matchAnswer('かな', ['かたかな'])).toBe('');
    expect(matchAnswer('かな', ['かな'])).toBe('かな');
    expect(matchAnswer('かな', ['ひらがな', 'かな'])).toBe('かな');
    expect(matchAnswer('漢字', ['ひらがな', '漢字'])).toBe('漢字');
    expect(matchAnswer('送り仮名', ['ひらがな', '漢字', '送り仮名'])).toBe('送り仮名');
  });

  it('match regardless of input tilde presence', () => {
    expect(matchAnswer('〜かな', ['かな'])).toBe('かな');
    expect(matchAnswer('~かな', ['かな'])).toBe('かな');
    expect(matchAnswer('かな〜', ['かな'])).toBe('かな');
    expect(matchAnswer('かな~', ['かな'])).toBe('かな');
    expect(matchAnswer('〜かな', ['〜かな'])).toBe('〜かな');
    expect(matchAnswer('~かな', ['~かな'])).toBe('~かな');
    expect(matchAnswer('かな〜', ['かな〜'])).toBe('かな〜');
    expect(matchAnswer('かな~', ['かな~'])).toBe('かな~');
  });

  it('match regardless of answer tilde presence', () => {
    expect(matchAnswer('かな', ['〜かな'])).toBe('〜かな');
    expect(matchAnswer('かな', ['~かな'])).toBe('~かな');
    expect(matchAnswer('かな', ['かな〜'])).toBe('かな〜');
    expect(matchAnswer('かな', ['かな~'])).toBe('かな~');
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

describe('combineAnswers', () => {
  // prettier-ignore
  const vocab = [
    { word: "ビー玉", primaryReading: "びーだま", secondaryReadings: ["ビーだま"] },
    { word: "四", primaryReading: "よん", secondaryReadings: [] },
    { word: "日本", primaryReading: "にほん", secondaryReadings: ["にっぽん"] },
  ];
  // prettier-ignore
  const synonyms = [
    { word: "天国", primaryReading: "てんごく" },
    { word: "丸い", primaryReading: "まるい" },
  ];

  it('sane defaults', () => {
    expect(combineAnswers()).toEqual([]);
    expect(combineAnswers([])).toEqual([]);
    expect(combineAnswers([], [])).toEqual([]);
    expect(combineAnswers([{}], [{}])).toEqual([]);
  });

  it('combines vocab', () => {
    expect(combineAnswers(vocab)).toMatchSnapshot();
  });

  it('combines synonyms', () => {
    expect(combineAnswers(synonyms)).toMatchSnapshot();
  });

  it('combines vocab & synonyms', () => {
    expect(combineAnswers(vocab, synonyms)).toMatchSnapshot();
  });
});
