import createDict from '../createDict';

describe('createDict', () => {
  it('sane default', () => {
    expect(createDict()).toEqual({});
    expect(createDict([])).toEqual({});
    expect(createDict({})).toEqual({});
  });
  it('uses array index by default', () => {
    const item1 = { val: 1 };
    const item2 = { val: 2 };
    expect(createDict([item1, item2])).toEqual({ 0: item1, 1: item2 });
  });
  it('uses array index if key not present', () => {
    const item1 = { val: 1, rightKey: 33 };
    const item2 = { val: 2, rightKey: 44 };
    expect(createDict([item1, item2], 'wrongKey')).toEqual({ 0: item1, 1: item2 });
  });
  it('uses key if provided', () => {
    const item = { val: 1, identifier: 'herp' };
    expect(createDict([item], 'identifier')).toEqual({ herp: item });
  });
});
