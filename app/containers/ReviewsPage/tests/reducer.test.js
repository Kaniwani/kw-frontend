import { TYPES } from '../actions';
import reviewsPageReducer from '../reducer';

describe('reviewsPageReducer', () => {
  it('returns the initial state', () => {
    expect(reviewsPageReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = TYPES.DEFAULT.LOAD;
    const expected = { loading: true };
    expect(reviewsPageReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = TYPES.DEFAULT.SUCCESS;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(reviewsPageReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = TYPES.DEFAULT.FAILURE;
    const payload = new Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(reviewsPageReducer({}, { type, payload })).toEqual(expected);
  });
});
