import vocabLevelPageReducer from '../reducer';

describe('vocabLevelPageReducer', () => {
  it('returns the initial state', () => {
    expect(vocabLevelPageReducer(undefined, {})).toEqual({});
  });
});
