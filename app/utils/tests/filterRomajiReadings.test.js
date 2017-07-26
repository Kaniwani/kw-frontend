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
  });

  it('should return original meanings if none left after filter', () => {
    expect(filterRomajiReadings(['robo'], [{ kana: ['ろぼ'] }])).toEqual(['robo']);
  });
});
