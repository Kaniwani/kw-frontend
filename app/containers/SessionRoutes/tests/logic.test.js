import { createMockStore } from 'redux-logic-test';

import sessionRoutes from '../actions';
import sessionRoutesReducer from '../reducer';
import defaultLogic from '../logic';

describe('SessionRoutes defaultLogic', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      reducer: sessionRoutesReducer, // default: identity reducer
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

    store.dispatch(sessionRoutes.load.request(payload, meta)); // kick off fetching
    store.dispatch({ type: 'BAR' }); // other dispatches

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SESSIONROUTES/LOAD/REQUEST', payload, meta },
        { type: 'BAR' },
        { type: 'SESSIONROUTES/LOAD/SUCCESS', payload },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });

  it('Should be able to cancel default async action', async () => {
    const payload = 'nope nope';
    const meta = 'nuh uh';
    const expected = { loading: false };

    store.dispatch(sessionRoutes.load.request(payload, meta));
    store.dispatch(sessionRoutes.load.cancel());

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SESSIONROUTES/LOAD/REQUEST', payload, meta },
        { type: 'SESSIONROUTES/LOAD/CANCEL' },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });
});
