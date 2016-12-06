import randInRange from '../randInRange';

describe('randInRange', () => {
  it('should return a number between 0-100 if no params specified', () => {
    const result = randInRange();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('should not return the same number given a large enough range', () => {
    const [result1, result2] = [randInRange(0, 10000), randInRange(0, 10000)];
    expect(result1).not.toBe(result2);
  });

  it('should return an integer between min and max', () => {
    const floatTest = () => randInRange(1.5, 2.5);
    const intTest = () => randInRange(0, 2);
    expect(floatTest()).toBeGreaterThanOrEqual(1);
    expect(floatTest()).toBeLessThanOrEqual(3);
    expect(intTest()).toBeGreaterThanOrEqual(0);
    expect(intTest()).toBeLessThanOrEqual(2);
  });
});
