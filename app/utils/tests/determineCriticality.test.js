import determineCriticality from '../determineCriticality';

describe('determineCriticality', () => {
  it('should have sane defaults', () => {
    expect(determineCriticality()).toBe(false);
    expect(determineCriticality(1)).toBe(false);
    expect(determineCriticality(undefined, 1)).toBe(false);
    expect(determineCriticality(2, 2)).toBe(false);
    expect(determineCriticality(0, 4)).toBe(true);
  });

  it('should respect critical threshold param', () => {
    expect(determineCriticality(1, 3)).toBe(true);
    expect(determineCriticality(2, 2, 0.5)).toBe(true);
    expect(determineCriticality(0, 10, 1)).toBe(true);
    expect(determineCriticality(1, 10, 100)).toBe(false);
  });

  it('should respect minimum attempt limit', () => {
    expect(determineCriticality(0, 4, 0.75)).toBe(true);
    expect(determineCriticality(0, 10, 0.75, 10)).toBe(true);
    expect(determineCriticality(0, 10, 0.75, 11)).toBe(false);
  });
});
