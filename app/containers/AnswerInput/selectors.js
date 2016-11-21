import { createSelector } from 'reselect';

/**
 * Direct selector to the answerInput state domain
 */
const selectAnswerInputDomain = () => (state) => state.get('answerInput');

/**
 * Other specific selectors
 */

const selectInputText = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('answerInput'),
);

/**
 * Default selector used by AnswerInput
 */

const selectAnswerInput = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.toJS(),
);

export default selectAnswerInput;
export {
  selectInputText,
};
