import sessionSummaryPageReducer from '../reducer';

describe('sessionSummaryPageReducer', () => {
  it('returns the initial state', () => {
    expect(sessionSummaryPageReducer(undefined, {})).toEqual({});
  });
});
