import getDateInWords from '../getDateInWords';

describe('getDateInWords()', () => {
  it("should return 'N/A' if no date passed", () => {
    expect(getDateInWords()).toBe('N/A');
  });

  it('should return a string formatted date', () => {
    const staticDate = new Date(2014, 11, 2); // Dec 2 2014
    expect(getDateInWords(staticDate)).toMatchSnapshot();
  });
});
