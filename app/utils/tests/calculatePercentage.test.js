import calculatePercentage from '../calculatePercentage';
import expect from 'expect';

describe('calculatePercentage', () => {
  it('should properly calculate percentage', () => {
    const expectedResult = 50;
    expect(calculatePercentage(50, 100)).toEqual(expectedResult);
  });

  it('should return 0 when attempting to divide by zero', () => {
    const expectedResult = 0;
    expect(calculatePercentage(0, 0)).toEqual(expectedResult);
  });
});
