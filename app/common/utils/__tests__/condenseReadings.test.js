import condenseReadings from '../condenseReadings';

describe('condenseReadings()', () => {
  it('should have a safe default', () => {
    expect(condenseReadings()).toMatchSnapshot();
  });

  it('should pass when only one reading', () => {
    expect(condenseReadings(vocab.single)).toMatchSnapshot();
  });

  it('should combine multiple readings with same characters', () => {
    expect(condenseReadings(vocab.sameCharacters)).toMatchSnapshot();
  });

  it('should pass when readings were already condensed', () => {
    const condensed = condenseReadings(vocab.sameCharacters);
    expect(condenseReadings(condensed)).toMatchSnapshot();
  });

  it('should not fail with unrelated readings', () => {
    expect(condenseReadings(vocab.sameCharacters.concat(...vocab.single))).toMatchSnapshot();
  });

  it('should work with prefixes', () => {
    expect(condenseReadings(vocab.prefix)).toMatchSnapshot();
  });

  it('should work with suffixes', () => {
    expect(condenseReadings(vocab.suffix)).toMatchSnapshot();
  });

  it('should work with mixed edge cases', () => {
    expect(condenseReadings(vocab.mixed)).toMatchSnapshot();
  });

  it('should work with only kana', () => {
    expect(condenseReadings(vocab.onlyKana)).toMatchSnapshot();
  });

  it('should re-order primary reading to start', () => {
    expect(condenseReadings(vocab.sameCharacters)).toMatchSnapshot();
  });
});

const vocab = {
  single: [
    {
      character: '売り上げ',
      kana: ['うりあげ'],
    },
  ],
  sameCharacters: [
    {
      character: '近々',
      kana: ['ちかぢか'],
    },
    {
      character: '近々',
      kana: ['きんきん'],
      furigana: '0:きんきん',
    },
    {
      character: '近々',
      kana: ['ちかじか'],
    },
  ],
  suffix: [
    {
      character: '各〜',
      kana: ['かく'],
    },
  ],
  prefix: [
    {
      character: '〜漬け',
      kana: ['づけ'],
    },
    {
      character: '〜才',
      kana: ['さい'],
    },
  ],
  mixed: [
    {
      character: 'ハート形',
      kana: ['ハートがた'],
    },
    {
      character: 'フランス人',
      kana: ['ふらんすじん'],
    },
    {
      character: '迷惑メール',
      kana: ['めいわくメール'],
    },
    {
      character: '烏龍茶',
      kana: ['ウーロンちゃ'],
    },
    {
      character: '缶ビール',
      kana: ['かんビール'],
    },
  ],
  onlyKana: [
    {
      character: 'そろそろ',
      kana: ['そろそろ'],
    },
    {
      character: 'マンコ',
      kana: ['マンコ'],
    },
  ],
};
