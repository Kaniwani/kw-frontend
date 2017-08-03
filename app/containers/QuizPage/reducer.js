import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import merge from 'lodash/merge';

import quiz from './actions';

const initialState = {
  backup: false,
  info: {
    isDisabled: true,
    activePanel: '',
    detailLevel: 0,
  },
  answer: {
    value: '',
    type: '',
    focus: false,
    isMarked: false,
    isValid: false,
    isCorrect: false,
    isIncorrect: false,
    isIgnored: false,
    isDisabled: false,
  },
};

/**
 * Rotates through numbers without going above max depth
 * @param  {Number} [level=0] level number
 * @return {Number} Previous level incremented by 1 || 0 if above max depth
 */
function getRotatedLevel(level = 0) {
  const newLevel = level + 1;
  return newLevel > 2 ? 0 : newLevel;
}

const infoReducer = handleActions({
  [quiz.info.cycledetail]: (state) => merge({}, state, { detailLevel: getRotatedLevel(state.detailLevel) }),
  [quiz.info.update]: (state, { payload }) => merge({}, state, payload),
  [quiz.info.reset]: () => initialState.info,
}, initialState.info);

const backupReducer = handleActions({
  [quiz.backup.set]: (state, { payload }) => payload,
  [quiz.backup.reset]: () => initialState.backup,
}, initialState.backup);

const answerReducer = handleActions({
  [quiz.answer.update]: (state, { payload }) => merge({}, state, payload),
  [quiz.answer.reset]: () => ({ ...initialState.answer, focus: true }),
}, initialState.answer);

export default combineReducers({
  backup: backupReducer,
  answer: answerReducer,
  info: infoReducer,
});
