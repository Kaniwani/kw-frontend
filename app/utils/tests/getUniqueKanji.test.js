import { readings } from 'shared/testTables';
import getUniqueKanji, { splitKanji } from '../getUniqueKanji';

describe('splitKanji()', () => {
  it('should have a safe default', () => {
    expect(splitKanji()).toMatchSnapshot();
  });

  it('should return empty array when no kanji', () => {
    readings.onlyKana.forEach(({ character }) =>
      expect(splitKanji(character)).toMatchSnapshot()
    );
  });

  it('should only return kanji', () => {
    readings.single.forEach(({ character }) => {
      expect(splitKanji(character)).toMatchSnapshot();
    });
    readings.prefix.forEach(({ character }) => {
      expect(splitKanji(character)).toMatchSnapshot();
    });
    readings.suffix.forEach(({ character }) => {
      expect(splitKanji(character)).toMatchSnapshot();
    });
  });

  it('should only return kanji with mixed', () => {
    readings.mixed.forEach(({ character }) =>
      expect(splitKanji(character)).toMatchSnapshot()
    );
  });
});

describe('getUniqueKanji()', () => {
  it('should have a safe default', () => {
    expect(getUniqueKanji()).toMatchSnapshot();
  });
  it('should return unique kanji when single entry', () => {
    expect(getUniqueKanji(readings.single)).toMatchSnapshot();
  });
  it('should return unique kanji when multiple same characters', () => {
    expect(getUniqueKanji(readings.sameCharacters)).toMatchSnapshot();
  });
  it('should work with prefixes', () => {
    expect(getUniqueKanji(readings.prefix)).toMatchSnapshot();
  });
  it('should work with suffixes', () => {
    expect(getUniqueKanji(readings.suffix)).toMatchSnapshot();
  });
  it('should work with mixed', () => {
    expect(getUniqueKanji(readings.mixed)).toMatchSnapshot();
  });
  it('should work with only kana', () => {
    expect(getUniqueKanji(readings.onlyKana)).toMatchSnapshot();
  });
});
