import quizAnswer from '../actions';
import quizAnswerReducer from '../reducer';

describe('quizAnswerReducer', () => {
  it('returns the initial state', () => {
    expect(quizAnswerReducer(undefined, {})).toEqual({});
  });
  it('request sets loading to true', () => {
    const type = quizAnswer.load.request;
    const expected = { loading: true };
    expect(quizAnswerReducer({}, { type })).toEqual(expected);
  });
  it('success merges the payload and sets loading to false', () => {
    const type = quizAnswer.load.success;
    const payload = 'default';
    const expected = { value: payload, loading: false };
    expect(quizAnswerReducer({}, { type, payload })).toEqual(expected);
  });
  it('failure sets an error and sets loading to false', () => {
    const type = quizAnswer.load.failure;
    const payload = Error('Wu-oh');
    const expected = { error: payload, loading: false };
    expect(quizAnswerReducer({}, { type, payload })).toEqual(expected);
  });
});
