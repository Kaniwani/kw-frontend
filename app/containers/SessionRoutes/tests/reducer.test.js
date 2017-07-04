import sessionRoutes from '../actions';
import sessionRoutesReducer from '../reducer';

describe('sessionRoutesReducer', () => {
  it('returns the initial state', () => {
    expect(sessionRoutesReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = sessionRoutes.load.request;
    const expected = { loading: true };
    expect(sessionRoutesReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = sessionRoutes.load.success;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(sessionRoutesReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = sessionRoutes.load.failure;
    const payload = Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(sessionRoutesReducer({}, { type, payload })).toEqual(expected);
  });
});
