import combinePartsOfSpeech from '../combinePartsOfSpeech';

describe('combinePartsOfSpeech', () => {
  it('sane defaults', () => {
    expect(combinePartsOfSpeech()).toEqual(['Uncommon']);
    expect(combinePartsOfSpeech({ tags: ['Noun'] })).toEqual(['Uncommon', 'Noun']);
  });

  it('handles common tag', () => {
    expect(combinePartsOfSpeech({ tags: ['Noun'], common: true })).toEqual(['Common', 'Noun']);
    expect(combinePartsOfSpeech({ tags: ['Noun'], common: false })).toEqual(['Uncommon', 'Noun']);
  });

  it('handles jlpt tag', () => {
    expect(combinePartsOfSpeech({ tags: ['Noun'], jlpt: 'JLPT1' })).toEqual(['JLPT1', 'Uncommon', 'Noun']);
    expect(combinePartsOfSpeech({ tags: ['Noun'], jlpt: null })).toEqual(['Uncommon', 'Noun']);
  });
});
