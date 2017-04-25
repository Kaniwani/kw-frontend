import branch from '../branch';

describe('branch', () => {
  it('should choose first value if predicate is true', () => {
    expect(branch(true, 1, 2)).toMatchSnapshot();
  });
  it('should choose second value if predicate is false', () => {
    expect(branch(false, 1, 2)).toMatchSnapshot();
  });
  it('second value should be null if not provided', () => {
    expect(branch(false, 1)).toMatchSnapshot();
  });
  it('should throw if predicate is not defined', () => {
    expect(() => branch(null, 2, 2)).toThrowErrorMatchingSnapshot();
  });
});
