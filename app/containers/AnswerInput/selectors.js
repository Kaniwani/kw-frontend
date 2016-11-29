import { createSelector } from 'reselect';

/**
 * Direct selector to the answerInput state domain
 */
const selectAnswerInputDomain = () => (state) => state.getIn(['review', 'answer']);

/**
 * Other specific selectors
 */

const selectInputText = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('inputText'),
);

const selectInputMatches = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('matches'),
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
  selectInputMatches,
};
