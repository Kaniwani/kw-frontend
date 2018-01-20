import { combineFuri, basicFuri, parseFuriString, generatePairs } from '../utils';

describe('combineFuri()', () => {
  describe('defaults', () => {
    it('no args', () => {
      expect(combineFuri()).toEqual([]);
    });
    it('no reading or furi', () => {
      expect(combineFuri('下駄')).toEqual([['', '下駄']]);
    });
    it('no furi', () => {
      expect(combineFuri('下駄', 'げた')).toEqual([['げた', '下駄']]);
    });
  });
  describe('with furi data', () => {
    it('accepts furi location string', () => {
      expect(combineFuri('お世辞', 'おせじ', '1:せ;2:じ')).toEqual([
        ['', 'お'],
        ['せ', '世'],
        ['じ', '辞'],
      ]);
    });
    it('handles special readings for better display', () => {
      // instead of putting the entire reading under the first kanji like the furi string suggests,
      // we use the "reading only" display so it's centered over the whole kanji group
      // this only applies to 義訓/熟字訓 words with an "0:かな" furi string
      expect(combineFuri('今日', 'きょう', '0:きょう')).toEqual([['きょう', '今日']]);
    });
  });
  describe('without furi data', () => {
    it('appropriate kana fallback', () => {
      expect(combineFuri('すいか', 'スイカ')).toEqual([['スイカ', 'すいか']]);
    });
    it('appropriate trailing okurigana fallback', () => {
      expect(combineFuri('大人しい', 'おとなしい')).toEqual([['おとな', '大人'], ['', 'しい']]);
    });
    it('appropriate inner okurigana fallback', () => {
      expect(combineFuri('使い方', 'つかいかた')).toEqual([['つかいかた', '使い方']]);
    });
    it('appropriate initial okurigana fallback', () => {
      expect(combineFuri('お世辞', 'おせじ')).toEqual([['おせじ', 'お世辞']]);
    });
    it("passes through mixed kanji katakana words since they're weirdo", () => {
      expect(combineFuri('缶ビール', 'かんびーる')).toEqual([['かんびーる', '缶ビール']]);
    });
  });
});

describe('basicFuri()', () => {
  describe('defaults', () => {
    it('no args', () => {
      expect(basicFuri()).toEqual([]);
    });
    it('no reading', () => {
      expect(basicFuri('漢字')).toEqual([['', '漢字']]);
    });
  });
  it('splits by okurigana if present', () => {
    expect(basicFuri('大人しい', 'おとなしい')).toEqual([['おとな', '大人'], ['', 'しい']]);
  });

  it('renders whole reading if no okurigana', () => {
    expect(basicFuri('使い方', 'つかいかた')).toEqual([['つかいかた', '使い方']]);
  });
});

describe('parseFuriString()', () => {
  it('has a sane default', () => {
    expect(parseFuriString()).toEqual([]);
  });
  it('works', () => {
    expect(parseFuriString('1:せ;2:じ')).toEqual([[[1, 2], 'せ'], [[2, 3], 'じ']]);
  });
});

describe('generatePairs()', () => {
  it('has a sane default', () => {
    expect(generatePairs()).toEqual([]);
  });
  it('works', () => {
    expect(generatePairs('お世辞', [[[1, 2], 'せ'], [[2, 3], 'じ']])).toEqual([
      ['', 'お'],
      ['せ', '世'],
      ['じ', '辞'],
    ]);
  });
});
