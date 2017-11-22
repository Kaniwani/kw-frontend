import parseTags from '../parseTags';

describe('parseTags()', () => {
  it('sane default', () => {
    expect(parseTags()).toEqual([]);
  });

  it('single tag', () => {
    expect(parseTags(['n'])).toEqual(['Noun']);
  });

  it('multi tags', () => {
    expect(parseTags(['n', 'adj', 'vs'])).toEqual([
      'Noun',
      'Adjective',
      'Suru Verb',
    ]);
  });

  it('skips invalid tags', () => {
    expect(parseTags(['n', 'derp', 'vs'])).toEqual(['Noun', 'Suru Verb']);
  });
});
