import randomInsert from '../randomInsert';

describe('randomInsert', () => {
  it('sane defaults', () => {
    expect(randomInsert()).toEqual([]);
    expect(randomInsert([])).toEqual([]);
    expect(randomInsert([], 1)).toEqual([1]);
  });

  it('inserts item', () => {
    const arr = Array.from({ length: 10 }, (_, i) => i);
    expect(randomInsert(arr, 10)).not.toEqual(arr);
  });
});
