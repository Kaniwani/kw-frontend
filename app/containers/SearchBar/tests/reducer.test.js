import searchBarReducer from '../reducer';

describe('searchBarReducer', () => {
  it('returns the initial state', () => {
    expect(searchBarReducer(undefined, {})).toEqual({});
  });
});
