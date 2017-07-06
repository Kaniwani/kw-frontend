import { TYPES } from '../actions';
import vocabLevelContainerReducer from '../reducer';

describe('vocabLevelContainerReducer', () => {
  it('returns the initial state', () => {
    expect(vocabLevelContainerReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = TYPES.DEFAULT.LOAD;
    const expected = { loading: true };
    expect(vocabLevelContainerReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = TYPES.DEFAULT.SUCCESS;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(vocabLevelContainerReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = TYPES.DEFAULT.FAILURE;
    const payload = new Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(vocabLevelContainerReducer({}, { type, payload })).toEqual(expected);
  });
});
