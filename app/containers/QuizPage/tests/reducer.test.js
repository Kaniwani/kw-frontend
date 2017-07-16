import sessionPage from '../actions';
import sessionPageReducer from '../reducer';

describe('sessionPageReducer', () => {
  it('returns the initial state', () => {
    expect(sessionPageReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = sessionPage.load.request;
    const expected = { loading: true };
    expect(sessionPageReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = sessionPage.load.success;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(sessionPageReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = sessionPage.load.failure;
    const payload = Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(sessionPageReducer({}, { type, payload })).toEqual(expected);
  });
});
