import dateOrFalse from '../dateOrFalse';

describe('dateOrFalse', () => {
  it('returns date or false', () => {
    expect(dateOrFalse()).toBe(false);
    expect(dateOrFalse(null)).toBe(false);
    expect(dateOrFalse(true)).toBe(false);
    expect(dateOrFalse(false)).toBe(false);
    expect(dateOrFalse('')).toBe(false);
    expect(dateOrFalse({})).toBe(false);
    expect(dateOrFalse([])).toBe(false);
    expect(dateOrFalse(new Date())).toBeDefined();
  });
});
