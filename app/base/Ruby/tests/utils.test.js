import { combineFuri, basicFuri, parseFuriString, generatePairs } from '../utils';

describe('combineFuri()', () => {
  it('has a sane default', () => {
    expect(combineFuri()).toEqual(expect.arrayContaining([]));
  });
  it('accepts furi location string', () => {
    expect(combineFuri('お世辞', 'おせじ', '1:せ;2:じ'))
      .toEqual(expect.arrayContaining([['', 'お'], ['せ', '世'], ['じ', '辞']]));
  });
  it('accepts furi location array', () => {
    expect(combineFuri('お世辞', 'おせじ', [[[1, 2], 'せ'], [[2, 3], 'じ']]))
      .toEqual(expect.arrayContaining([['', 'お'], ['せ', '世'], ['じ', '辞']]));
  });
  it('renders appropriate fallbacks', () => {
    expect(combineFuri('すいか', 'スイカ'))
      .toEqual(expect.arrayContaining([['スイカ', 'すいか']]));
  });
  it('renders appropriate fallbacks', () => {
    expect(combineFuri('大人しい', 'おとなしい'))
      .toEqual(expect.arrayContaining([['おとな', '大人'], ['', 'しい']]));
  });
  it('renders appropriate fallbacks', () => {
    expect(combineFuri('使い方', 'つかいかた'))
      .toEqual(expect.arrayContaining([['つかいかた', '使い方']]));
  });
});

describe('basicFuri()', () => {
  it('has a sane default', () => {
    expect(basicFuri()).toEqual(expect.arrayContaining([]));
  });
  it('splits by okurigana if present', () => {
    expect(basicFuri('大人しい', 'おとなしい'))
      .toEqual(expect.arrayContaining([['おとな', '大人'], ['', 'しい']]));
  });
  it('renders whole reading if no okurigana', () => {
    expect(basicFuri('使い方', 'つかいかた'))
      .toEqual(expect.arrayContaining([['つかいかた', '使い方']]));
  });
});

describe('parseFuriString()', () => {
  it('has a sane default', () => {
    expect(parseFuriString()).toEqual(expect.arrayContaining([]));
  });
  it('works', () => {
    expect(parseFuriString('1:せ;2:じ'))
      .toEqual(expect.arrayContaining([[[1, 2], 'せ'], [[2, 3], 'じ']]));
  });
});

describe('generatePairs()', () => {
  it('has a sane default', () => {
    expect(generatePairs()).toEqual(expect.arrayContaining([]));
  });
  it('works', () => {
    expect(generatePairs('お世辞', [[[1, 2], 'せ'], [[2, 3], 'じ']]))
      .toEqual(expect.arrayContaining([['', 'お'], ['せ', '世'], ['じ', '辞']]));
  });
});
