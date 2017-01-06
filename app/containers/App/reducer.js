/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { SAVE, LOAD } from 'redux-storage';
import isEmpty from 'lodash/isEmpty';
// import modalReducer, { modalInitialState } from 'containers/Modal/reducer';
// import addSynonymReducer, { addSynonymInitialState } from 'containers/AddSynonymForm/reducer';
// import * as AddSynonym from 'containers/AddSynonymForm/constants';
// import * as Modal from 'containers/Modal/constants';
import * as App from './constants';

// The initial state of the App
export const initialState = fromJS({
  storage: {
    loaded: null,
    empty: null,
  },
  loading: false,
  error: false,
  // modal: modalInitialState,
  // addSynonym: addSynonymInitialState,
  user: {
    name: '',
    reviewCount: 0,
    apiKey: '',
    apiValid: null,
    joinDate: null,
    lastWkSyncDate: null,
    lastKwSyncDate: null,
    level: 0,
    unlockedLevels: null,
    settings: {
      followMe: null,
      autoAdvanceCorrect: null,
      autoAdvanceDelay: 3000,
      autoExpandCorrect: null,
      autoExpandIncorrect: null,
      burnedOnly: null,
      onVacation: null,
      vacationDate: null,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      const loadedState = action.payload;
      return isEmpty(loadedState) ?
        state.set('storage', fromJS({ loaded: true, empty: true })) :
        state.set(action.payload).set('storage', fromJS({ loaded: true, empty: true }));
    }
    case SAVE:
      console.info('Storage saved!'); // eslint-disable-line no-console
      return state;
    case App.LOAD_USERDATA:
      return state
        .set('loading', action.showIndicator)
        .set('error', false);
    case App.LOAD_USERDATA_SUCCESS:
      return state
        .set('user', fromJS(action.payload))
        .set('loading', false);
    case App.LOAD_USERDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    // case AddSynonym.LOAD_JISHODATA:
    // case AddSynonym.LOAD_JISHODATA_SUCCESS:
    // case AddSynonym.LOAD_JISHODATA_ERROR:
    //   return state.set('addSynonym', fromJS(addSynonymReducer(state.get('addSynonym'), action)));
    // case Modal.SHOW_MODAL:
    // case Modal.HIDE_MODAL:
    //   return state.set('modal', fromJS(modalReducer(state.get('modal'), action)));
    default:
      return state;
  }
}

export default appReducer;
