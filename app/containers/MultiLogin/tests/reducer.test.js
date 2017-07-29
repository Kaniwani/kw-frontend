import multiLogin from '../actions';
import multiLoginReducer from '../reducer';

describe('multiLoginReducer', () => {
  it('returns the initial state', () => {
    expect(multiLoginReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = multiLogin.load.request;
    const expected = { loading: true };
    expect(multiLoginReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = multiLogin.load.success;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(multiLoginReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = multiLogin.load.failure;
    const payload = Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(multiLoginReducer({}, { type, payload })).toEqual(expected);
  });
});
