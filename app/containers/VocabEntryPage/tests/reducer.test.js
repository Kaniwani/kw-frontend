import vocabEntryPageReducer from '../reducer';

describe('vocabEntryPageReducer', () => {
  it('returns the initial state', () => {
    expect(vocabEntryPageReducer(undefined, {})).toEqual({});
  });
});
