import filterRomajiReadings from '../filterRomajiReadings';

describe('filterRomajiReadings()', () => {
  it('should have a safe default', () => {
    expect(filterRomajiReadings()).toEqual([]);
    expect(filterRomajiReadings(['word'], undefined)).toEqual(['word']);
    expect(filterRomajiReadings(undefined, ['word'])).toEqual([]);
  });

  it('should strip romaji readings', () => {
    expect(filterRomajiReadings(['Southern Barbarians', 'Nanban'], ['なんばん'])).toEqual([
      'Southern Barbarians',
    ]);
    expect(filterRomajiReadings(['robo', 'bobo'], ['ろぼ'])).toEqual(['bobo']);

    // can only do so much ¯\_(ツ)_/¯
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

  it('should return original meanings if none left after filter', () => {
    expect(filterRomajiReadings(['robo'], ['ろぼ'])).toEqual(['robo']);
  });
});
