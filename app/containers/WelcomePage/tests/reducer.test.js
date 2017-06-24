import welcomePageReducer from '../reducer';

describe('welcomePageReducer', () => {
  it('returns the initial state', () => {
    expect(welcomePageReducer(undefined, {})).toEqual({});
  });
});
