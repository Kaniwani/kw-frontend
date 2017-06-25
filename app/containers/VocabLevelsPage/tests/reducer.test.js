import vocabLevelsPageReducer from '../reducer';

describe('vocabLevelsPageReducer', () => {
  it('returns the initial state', () => {
    expect(vocabLevelsPageReducer(undefined, {})).toEqual({});
  });
});
