import parseTags from '../parseTags';

describe('parseTags()', () => {
  it('sane default', () => {
    expect(parseTags()).toBe([]);
  });

  it('single tag', () => {
    expect(parseTags(['n'])).toBe('Noun');
  });

  it('multi tags', () => {
    expect(parseTags(['n', 'adj', 'vs'])).toBe(
      'Noun',
      'Adjective',
      'Suru Verb'
    );
  });

  it('skips invalid tags', () => {
    expect(parseTags(['n', 'derp', 'vs'])).toBe('Noun', 'Suru Verb');
  });
});
