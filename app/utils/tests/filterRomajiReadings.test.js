import filterRomajiReadings from '../filterRomajiReadings';

describe('filterRomajiReadings()', () => {
  it('should have a safe default', () => {
    expect(filterRomajiReadings()).toEqual([]);
    expect(filterRomajiReadings(['word'], undefined)).toEqual(['word']);
    expect(filterRomajiReadings(undefined, [{ kana: ['word'] }])).toEqual([]);
  });

  it('should strip romaji readings', () => {
    expect(filterRomajiReadings(['Southern Barbarians', 'Nanban'], [{ kana: ['なんばん'] }])).toEqual(['Southern Barbarians']);
    expect(filterRomajiReadings(['robo', 'bobo'], [{ kana: ['ろぼ'] }])).toEqual(['bobo']);

    // can only do so much ¯\_(ツ)_/¯
    expect(filterRomajiReadings(
      ['jomon people', 'joumon people', 'joumon', 'jomon', 'ancient japanese'],
      [{ kana: ['じょうもん'] }]
    )).toEqual(['jomon people', 'jomon', 'ancient japanese']);
  });

  it('should return original meanings if none left after filter', () => {
    expect(filterRomajiReadings(['robo'], [{ kana: ['ろぼ'] }])).toEqual(['robo']);
  });
});
