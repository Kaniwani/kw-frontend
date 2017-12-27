import { handleActions, combineActions } from 'redux-actions';
import { merge } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import quiz from 'features/quiz/actions';

const initialState = {
  isDisabled: true,
  activePanel: '',
  detailLevel: 0,
};

const updateInfo = (state, { payload }) => merge({}, state, payload);
const cycleDetail = (state) =>
  merge({}, state, { detailLevel: getRotatedLevel(state.detailLevel) });

export const quizInfoReducer = handleActions(
  {
    [quiz.info.cycledetail]: cycleDetail,
    [quiz.info.update]: updateInfo,
    [combineActions(quiz.info.reset, LOCATION_CHANGE)]: () => initialState,
  },
  initialState
);

/**
 * Rotates through numbers without going above max depth
 * @param  {Number} [level=0] level number
 * @return {Number} Previous level incremented by 1 || 0 if above max depth
 */
function getRotatedLevel(level = 0) {
  const newLevel = level + 1;
  return newLevel > 2 ? 0 : newLevel;
}

export default quizInfoReducer;
