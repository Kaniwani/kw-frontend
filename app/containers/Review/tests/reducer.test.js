
import { fromJS } from 'immutable';
import reviewReducer from '../reducer';
import {
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from 'containers/ReviewAnswer/constants';

import {
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
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

    expect(reviewReducer(testState, { type: LOAD_REVIEWDATA_ERROR, payload: 'whoops' }))
      .toEqual(expectedState);
  });

  it('sets loaded review data', () => {
    const testState = fromJS({ loading: true, queue: [] });
    const queue = fromJS([{ id: 0 }, { id: 1 }]);
    const count = 2;
    const expectedState = fromJS({ loading: false, queue, total: count });

    expect(reviewReducer(testState, { type: LOAD_REVIEWDATA_SUCCESS, payload: { count, reviews: queue } }))
      .toEqual(expectedState);
  });

  it('sets new current', () => {
    const testState = fromJS({
      queue: [{ id: 0 }, { id: 1 }],
      answer: {
        inputText: 'wubbalub',
        inputDisabled: true,
        valid: true,
        marked: true,
        matches: true,
      },
      current: null,
    });
    const expectedState = fromJS({
      queue: [{ id: 1 }],
      answer: {
        inputText: '',
        inputDisabled: false,
        valid: null,
        marked: false,
        matches: false,
      },
      current: { id: 0 },
    });

    expect(reviewReducer(testState, { type: SET_NEW_CURRENT }))
      .toEqual(expectedState);
  });

  it('returns current to queue', () => {
    const testState = fromJS({ queue: [{ id: 0 }], current: { id: 1 } });
    const expectedState = fromJS({ queue: [{ id: 0 }, { id: 1 }], current: { id: 1 } });

    expect(reviewReducer(testState, { type: RETURN_CURRENT_TO_QUEUE }))
      .toEqual(expectedState);
  });

  it('moves current to completed', () => {
    const testState = fromJS({ completed: [], current: { id: 0 } });
    const expectedState = fromJS({ completed: [{ id: 0 }], current: { id: 0 } });

    expect(reviewReducer(testState, { type: MOVE_CURRENT_TO_COMPLETED }))
      .toEqual(expectedState);
  });

  it('marks current correct', () => {
    const testState = fromJS({ current: { session: { correct: 1 } } });
    const expectedState = fromJS({ current: { session: { correct: 2 } }, answer: { marked: true, inputDisabled: true } });

    expect(reviewReducer(testState, { type: MARK_CORRECT }))
      .toEqual(expectedState);
  });

  it('marks current incorrect', () => {
    const testState = fromJS({ current: { session: { incorrect: 1 } } });
    const expectedState = fromJS({ current: { session: { incorrect: 2 } }, answer: { marked: true, inputDisabled: true } });

    expect(reviewReducer(testState, { type: MARK_INCORRECT }))
      .toEqual(expectedState);
  });

  it('marks current ignored', () => {
    const testState = fromJS({ current: { session: { ignored: 1, incorrect: 1 } }, session: { ignored: 1 } });
    const expectedState = fromJS({ current: { session: { ignored: 2, incorrect: 0 } }, session: { ignored: 2 } });

    expect(reviewReducer(testState, { type: MARK_IGNORED, payload: false /* answer to ignore was incorrect */ }))
      .toEqual(expectedState);
  });
});
