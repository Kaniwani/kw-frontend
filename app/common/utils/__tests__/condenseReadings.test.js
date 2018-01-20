import vocab from 'common/data/fixtures/vocab';
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
