import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import merge from 'lodash/merge';

import quiz from './actions';

const initialState = {
  quiz: {
    answer: {
      value: '',
      type: '',
      isMarked: false,
      isFocused: false,
      isValid: false,
      isCorrect: false,
      isIncorrect: false,
      isDisabled: false,
    },
  },
};

const quizReducer = handleActions({
  [quiz.answer.update]: (state, { payload }) => update(state, {
    answer: { $set: merge({}, state.answer, payload) },
  }),
  [quiz.answer.reset]: (state) => update(state, {
    answer: { $set: initialState.quiz.answer },
  }),
}, initialState.quiz);

export default combineReducers({
  quiz: quizReducer,
});
