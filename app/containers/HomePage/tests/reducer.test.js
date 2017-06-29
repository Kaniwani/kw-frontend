import { TYPES } from '../actions';
import homePageReducer from '../reducer';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = TYPES.USER.LOAD;
    const expected = { loading: true };
    expect(homePageReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = TYPES.USER.SUCCESS;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(homePageReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = TYPES.USER.FAILURE;
    const payload = new Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(homePageReducer({}, { type, payload })).toEqual(expected);
  });
});
