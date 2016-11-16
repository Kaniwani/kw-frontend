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

import {
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA,
  LOAD_USERDATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERDATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('user', false);
    case LOAD_USERDATA_SUCCESS: {
      return state
        .set('user', shapeUserData(action.userData))
        .set('loading', false);
    }
    case LOAD_USERDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

function shapeUserData(data) {
  const shapedData = {
    name: data.name,
    reviewsCount: data.review_count,
    apiKey: data.api_key,
    apiValid: data.api_valid,
    joinDate: new Date(data.join_date),
    lastWkSyncDate: (data.last_wanikani_sync_date != null) ? new Date(data.last_wanikani_sync_date) : null,
    level: data.level,
    unlockedLevels: data.unlocked_levels,
    settings: {
      followMe: data.follow_me,
      autoAdvanceCorrect: data.auto_advance_on_success,
      autoExpandCorrect: data.auto_expand_answer_on_success,
      autoExpandIncorrect: data.auto_expand_answer_on_failure,
      burnedOnly: data.only_review_burned,
      onVacation: data.on_vacation,
      vacationDate: (data.vacation_date != null) ? new Date(data.vacation_date) : null,
    },
  };
  return shapedData;
}


export default appReducer;
