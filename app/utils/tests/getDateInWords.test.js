import getDateInWords from '../getDateInWords';

describe('getDateInWords()', () => {
  it("should return 'unknown' if no date passed", () => {
    expect(getDateInWords()).toBe('unknown');
  });

  it('should return a string formatted date', () => {
    const staticDate = new Date(2014, 10, 2);
    const expected = '12:00am, Nov 2nd 2014';
    expect(getDateInWords(staticDate)).toBe(expected);
  });
});
