import { getWrapUpItems } from '../reducer';
import { WRAP_UP_STARTING_COUNT } from '../constants';

describe('getWrapUpItems', () => {
  it('includes previously incorrect items', () => {
    const state = {
      incorrect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      complete: [],
      queue: [],
    };
    expect(getWrapUpItems(state)).toEqual(state.incorrect);
  });
  it('excludes incorrect items that are complete', () => {
    const state = {
      incorrect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      complete: [1, 2, 3, 4],
      queue: [],
    };
    expect(getWrapUpItems(state)).not.toContain(1);
    expect(getWrapUpItems(state)).not.toContain(2);
    expect(getWrapUpItems(state)).not.toContain(3);
    expect(getWrapUpItems(state)).not.toContain(4);
  });
  it('pads with queue items', () => {
    const state = {
      incorrect: [1, 2, 3, 4, 5, 6, 7],
      complete: [],
      queue: [8, 9],
    };
    expect(getWrapUpItems(state)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it('excludes queue items that are already incorrect', () => {
    const state = {
      incorrect: [1, 2, 3],
      complete: [1, 2, 3],
      queue: [1, 2, 3, 4, 5, 6],
    };
    expect(getWrapUpItems(state)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it(`pads with queue items only up to ${WRAP_UP_STARTING_COUNT}`, () => {
    const state = {
      incorrect: [1, 2, 3, 4, 5, 6, 7, 8],
      complete: [],
      queue: [9, 10, 11, 12, 13, 14, 15],
    };
    expect(getWrapUpItems(state)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
