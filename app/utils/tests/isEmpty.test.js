import isEmpty from '../isEmpty';

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });
  it('should return false for values with content', () => {
    expect(isEmpty(' ')).toBe(false);
    expect(isEmpty([''])).toBe(false);
    expect(isEmpty({ k: '' })).toBe(false);
  });
});
