import { createMockStore } from 'redux-logic-test';

import { TYPES, defaultLoad, defaultLoadCancel } from '../actions';
import defaultLogic from '../logic';
import vocabLevelsContainerReducer from '../reducer';

describe('VocabLevelsContainer defaultLogic', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      reducer: vocabLevelsContainerReducer, // default: identity reducer
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

    store.dispatch(defaultLoad(payload, meta)); // kick off fetching
    store.dispatch({ type: 'BAR' }); // other dispatches

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: TYPES.DEFAULT.LOAD, payload, meta },
        { type: 'BAR' },
        { type: TYPES.DEFAULT.SUCCESS, payload },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });

  it('Should be able to cancel default async action', async () => {
    const payload = 'nope nope';
    const expected = { loading: false };

    store.dispatch(defaultLoad(payload));
    store.dispatch(defaultLoadCancel());

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: TYPES.DEFAULT.LOAD, payload },
        { type: TYPES.DEFAULT.CANCEL },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });
});
