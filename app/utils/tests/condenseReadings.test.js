import condenseReadings from '../condenseReadings';
import { readings } from './testTables';

describe('condenseReadings()', () => {
  it('should pass when only one reading', () => {
    expect(condenseReadings(readings.single)).toMatchSnapshot();
  });

  it('should combine multiple readings with same characters', () => {
    expect(condenseReadings(readings.sameCharacters)).toMatchSnapshot();
  });

  it('should not fail with unrelated readings', () => {
    expect(condenseReadings(readings.sameCharacters.concat(...readings.single))).toMatchSnapshot();
  });

  it('should work with prefixes', () => {
    expect(condenseReadings(readings.prefix)).toMatchSnapshot();
  });

  it('should work with suffixes', () => {
    expect(condenseReadings(readings.suffix)).toMatchSnapshot();
  });

  it('should work with mixed edge cases', () => {
    expect(condenseReadings(readings.mixed)).toMatchSnapshot();
  });

  it('should work with only kana', () => {
    expect(condenseReadings(readings.onlyKana)).toMatchSnapshot();
  });
});
