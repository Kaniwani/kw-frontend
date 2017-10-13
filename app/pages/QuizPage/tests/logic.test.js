import { createMockStore } from 'redux-logic-test';

import sessionPage from '../actions';
import sessionPageReducer from '../reducer';
import defaultLogic from '../logic';

describe('QuizPage defaultLogic', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      reducer: sessionPageReducer, // default: identity reducer
      logic: defaultLogic, // default: []
    /*
      initialState: {},
      injectedDeps = { // include anything logic needs access to
        API: api // could include mocked API for easy testing
      },
      middleware: optionalArr // other mw, exclude logicMiddleware
    */
    });
  });

  it('Should handle default async action', async () => {
    const payload = 'async logic value';
    const meta = 'so meta';
    const expected = { value: payload, loading: false };

    store.dispatch(sessionPage.load.request(payload, meta)); // kick off fetching
    store.dispatch({ type: 'BAR' }); // other dispatches

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SESSIONPAGE/LOAD/REQUEST', payload, meta },
        { type: 'BAR' },
        { type: 'SESSIONPAGE/LOAD/SUCCESS', payload },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });

  it('Should be able to cancel default async action', async () => {
    const payload = 'nope nope';
    const meta = 'nuh uh';
    const expected = { loading: false };

    store.dispatch(sessionPage.load.request(payload, meta));
    store.dispatch(sessionPage.load.cancel());

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SESSIONPAGE/LOAD/REQUEST', payload, meta },
        { type: 'SESSIONPAGE/LOAD/CANCEL' },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });
});
