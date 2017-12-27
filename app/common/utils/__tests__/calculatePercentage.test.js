import calculatePercentage from '../calculatePercentage';

describe('calculatePercentage', () => {
  it('should properly calculate percentage', () => {
    expect(calculatePercentage(50, 100)).toEqual(50);
  });

  it('should return 0 when attempting to divide by zero', () => {
    expect(calculatePercentage(0)).toEqual(0);
  });
});
