import vocabChipListReducer from '../reducer';

describe('vocabChipListReducer', () => {
  it('returns the initial state', () => {
    expect(vocabChipListReducer(undefined, {})).toEqual({});
  });
});
