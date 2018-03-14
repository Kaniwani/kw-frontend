import filterRomajiReadings from '../filterRomajiReadings';

describe('filterRomajiReadings()', () => {
  it('should have a safe default', () => {
    expect(filterRomajiReadings()).toEqual([]);
    expect(filterRomajiReadings(['word'], undefined)).toEqual(['word']);
    expect(filterRomajiReadings(undefined, ['word'])).toEqual([]);
  });

  it('should strip romaji readings', () => {
    expect(filterRomajiReadings(['southern barbarians', 'nanban'], ['なんばん'])).toEqual([
      'southern barbarians',
    ]);
    expect(filterRomajiReadings(['robo', 'bobo'], ['ろぼ'])).toEqual(['bobo']);

    expect(
      filterRomajiReadings(
        ['jomon people', 'joumon people', 'joumon', 'jomon', 'ancient japanese'],
        ['じょうもん']
      )
    ).toEqual(['jomon people', 'jomon', 'ancient japanese']);

    expect(
      filterRomajiReadings(
        ['northeast', 'tohoku', 'tohoku region', 'touhoku region', 'touhoku'],
        ['とうほく']
      )
    ).toEqual(['northeast', 'tohoku', 'tohoku region']);
  });

  // can => かん in hiragana and removes meanings it shouldn't
  it('should respect whitelisted meanings', () => {
    expect(filterRomajiReadings(['tin can', 'tin', 'can'], ['かん'])).toEqual([
      'tin can',
      'tin',
      'can',
    ]);
  });

  it('should return original meanings if none left after filter', () => {
    expect(filterRomajiReadings(['robo'], ['ろぼ'])).toEqual(['robo']);
  });
});
