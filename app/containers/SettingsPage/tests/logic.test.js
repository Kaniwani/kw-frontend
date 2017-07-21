import { createMockStore } from 'redux-logic-test';

import settingsPage from '../actions';
import settingsPageReducer from '../reducer';
import defaultLogic from '../logic';

describe('SettingsPage defaultLogic', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      reducer: settingsPageReducer, // default: identity reducer
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

    store.dispatch(settingsPage.load.request(payload, meta)); // kick off fetching
    store.dispatch({ type: 'BAR' }); // other dispatches

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SETTINGSPAGE/LOAD/REQUEST', payload, meta },
        { type: 'BAR' },
        { type: 'SETTINGSPAGE/LOAD/SUCCESS', payload },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });

  it('Should be able to cancel default async action', async () => {
    const payload = 'nope nope';
    const meta = 'nuh uh';
    const expected = { loading: false };

    store.dispatch(settingsPage.load.request(payload, meta));
    store.dispatch(settingsPage.load.cancel());

    await store.whenComplete(() => { // runs this fn when all logic is complete
      expect(store.actions).toEqual([
        { type: 'SETTINGSPAGE/LOAD/REQUEST', payload, meta },
        { type: 'SETTINGSPAGE/LOAD/CANCEL' },
      ]);
      expect(store.getState()).toEqual(expected);
    });
  });
});
