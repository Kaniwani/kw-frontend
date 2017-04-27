import splitKeepingDelimiter from '../splitKeepingDelimiter';

describe('splitKeepingDelimiter()', () => {
  it('should return an empty array if nothing passed', () => {
    expect(splitKeepingDelimiter()).toEqual([]);
  });

  it('should return an empty array if argument was not a string', () => {
    const items = [null, {}, [], new Map()];
    items.forEach((item) => expect(splitKeepingDelimiter(item)).toEqual([]));
  });

  it('should split words by comma as default', () => {
    expect(splitKeepingDelimiter('This,is,a,default example')).toMatchSnapshot();
  });

  it('should accept a custom delimiter', () => {
    expect(splitKeepingDelimiter('This;is;a;custom example', ';')).toMatchSnapshot();
  });

  it('should accept regex flags', () => {
    expect(splitKeepingDelimiter('Split ignoring WORD case', 'word', 'gi')).toMatchSnapshot();
  });
});
