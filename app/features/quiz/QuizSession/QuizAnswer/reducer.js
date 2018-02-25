import { handleActions, combineActions } from 'redux-actions';
import { merge } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import quiz from 'features/quiz/actions';

const initialState = {
  value: '',
  type: '',
  isFocused: true,
  isMarked: false,
  isValid: false,
  isCorrect: false,
  isIncorrect: false,
  isDisabled: false,
  isIgnored: false,
};

export const quizAnswerReducer = handleActions(
  {
    [quiz.answer.update]: (state, { payload }) => merge({}, state, payload),
    [combineActions(quiz.answer.reset, LOCATION_CHANGE)]: () => initialState,
  },
  initialState
);

export default quizAnswerReducer;
