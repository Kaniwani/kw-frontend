import { createMockStore } from 'redux-logic-test';

import { TYPES, userLoad, userLoadCancel } from '../actions';
import defaultLogic from '../logic';
import homePageReducer from '../reducer';

describe('HomePage defaultLogic', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      reducer: homePageReducer, // default: identity reducer
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

    store.dispatch(userLoad(payload, meta)); // kick off fetching
    store.dispatch({ type: 'BAR' }); // other dispatches

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: TYPES.USER.LOAD, payload, meta },
        { type: 'BAR' },
        { type: TYPES.USER.SUCCESS, payload },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });

  it('Should be able to cancel default async action', async () => {
    const payload = 'nope nope';
    const expected = { loading: false };

    store.dispatch(userLoad(payload));
    store.dispatch(userLoadCancel());

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: TYPES.USER.LOAD, payload },
        { type: TYPES.USER.CANCEL },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });
});
