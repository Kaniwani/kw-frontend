
import reviewReducer from '../reducer';
import { fromJS } from 'immutable';
import {
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from '../constants';

describe('Review reducer', () => {
  it('returns the initial state', () => {
    expect(reviewReducer(fromJS({ test: true }), {}))
      .toEqual(fromJS({ test: true }));
  });

  it('handles loading', () => {
    const testState = fromJS({ loading: false, error: false });
    const expectedState = fromJS({ loading: true, error: false });

    expect(reviewReducer(testState, { type: LOAD_REVIEWDATA }))
      .toEqual(expectedState);
  });

  it('handles error', () => {
    const testState = fromJS({ error: false, loading: true });
    const expectedState = fromJS({ error: 'whoops', loading: false });

    expect(reviewReducer(testState, { type: LOAD_REVIEWDATA_ERROR, error: 'whoops' }))
      .toEqual(expectedState);
  });

  it('sets loaded review data', () => {
    const testState = fromJS({ loading: true, reviews: [] });
    const reviews = [{ id: 0 }, { id: 1 }];
    const count = 2;
    const expectedState = fromJS({ loading: false, reviews, total: count });

    expect(reviewReducer(testState, { type: LOAD_REVIEWDATA_SUCCESS, data: { reviews, count } }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { correct: 1 } });
    const expectedState = fromJS({ current: { correct: 2 } });

    expect(reviewReducer(testState, { type: MARK_CORRECT }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { correct: 1 } });
    const expectedState = fromJS({ current: { correct: 2 } });

    expect(reviewReducer(testState, { type: SET_NEW_CURRENT }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { correct: 1 } });
    const expectedState = fromJS({ current: { correct: 2 } });

    expect(reviewReducer(testState, { type: RETURN_CURRENT_TO_QUEUE }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { correct: 1 } });
    const expectedState = fromJS({ current: { correct: 2 } });

    expect(reviewReducer(testState, { type: MOVE_CURRENT_TO_COMPLETED }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { correct: 1 } });
    const expectedState = fromJS({ current: { correct: 2 } });

    expect(reviewReducer(testState, { type: MARK_CORRECT }))
      .toEqual(expectedState);
  });

  it('marks current incorrect', () => {
    const testState = fromJS({ current: { incorrect: 1 }, progress: { incorrect: 1 } });
    const expectedState = fromJS({ current: { incorrect: 2 }, progress: { incorrect: 2 } });

    expect(reviewReducer(testState, { type: MARK_INCORRECT }))
      .toEqual(expectedState);
  });

  it('marks current ignored', () => {
    const testState = fromJS({ current: { ignored: 1 }, progress: { ignored: 1 } });
    const expectedState = fromJS({ current: { ignored: 2 }, progress: { ignored: 2 } });

    expect(reviewReducer(testState, { type: MARK_IGNORED }))
      .toEqual(expectedState);
  });
});
