import protectedRoutesReducer from '../reducer';

describe('protectedRoutesReducer', () => {
  it('returns the initial state', () => {
    expect(protectedRoutesReducer(undefined, {})).toEqual({});
  });
});
