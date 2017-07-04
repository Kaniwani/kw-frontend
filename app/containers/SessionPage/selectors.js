import { createSelector } from 'reselect';
import { makeSelectQuiz } from 'containers/SessionRoutes/selectors';

const selectQuizDomain = makeSelectQuiz();

export default selectQuizDomain;
export {
  makeSelectQuiz,
};
