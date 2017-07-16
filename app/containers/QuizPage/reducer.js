import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import merge from 'lodash/merge';

import quiz from './actions';

const initialState = {
  backup: false,
  answer: {
    value: '',
    type: '',
    focus: false,
    isMarked: false,
    isValid: false,
    isCorrect: false,
    isIncorrect: false,
    isDisabled: false,
  },
};

const backupReducer = handleActions({
  [quiz.backup.set]: (state, { payload }) => payload,
  [quiz.backup.reset]: () => initialState.backup,
}, initialState.backup);

const answerReducer = handleActions({
  [quiz.answer.set]: (state, { payload }) => merge({}, state, payload),
  [quiz.answer.reset]: () => ({ ...initialState.answer, focus: true }),
}, initialState.answer);

export default combineReducers({
  backup: backupReducer,
  answer: answerReducer,
});
