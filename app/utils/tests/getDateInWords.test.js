import getDateInWords from '../getDateInWords';

describe('getDateInWords()', () => {
  it("should return 'unknown' if no date passed", () => {
    expect(getDateInWords()).toBe('unknown');
  });

  it('should return a string formatted date', () => {
    const staticDate = new Date(2014, 10, 2);
    expect(getDateInWords(staticDate)).toMatchSnapshot();
  });
});
