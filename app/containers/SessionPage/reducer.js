import { handleActions } from 'redux-actions';
import quiz from './actions';

const initialState = {};

const quizReducer = handleActions({
  [quiz.answer.check]: (state, { payload }) => ({ ...state, answer: payload }),
}, initialState);

export default quizReducer;
