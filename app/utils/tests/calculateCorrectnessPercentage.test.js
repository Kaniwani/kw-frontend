import calculateCorrectnessPercentage from '../calculateCorrectnessPercentage';

describe('calculateCorrectnessPercentage()', () => {
  it('should properly calculate correctness', () => {
    const history = {
      correct: 3,
      incorrect: 7,
    };
    const session = {
      correct: 1,
      incorrect: 1,
    };
    expect(calculateCorrectnessPercentage(history, session)).toEqual(33);
  });

  it('should return 100 when all correct', () => {
    const history = {
      correct: 3,
      incorrect: 0,
    };
    const session = {
      correct: 1,
      incorrect: 0,
    };
    expect(calculateCorrectnessPercentage(history, session)).toEqual(100);
  });
  it('should return 0 when all incorrect', () => {
    const history = {
      correct: 0,
      incorrect: 4,
    };
    const session = {
      correct: 0,
      incorrect: 2,
    };
    expect(calculateCorrectnessPercentage(history, session)).toEqual(0);
  });
  it('should return 0 when no previous answers', () => {
    const history = {
      correct: 0,
      incorrect: 0,
    };
    const session = {
      correct: 0,
      incorrect: 0,
    };
    expect(calculateCorrectnessPercentage(history, session)).toEqual(0);
  });
});
