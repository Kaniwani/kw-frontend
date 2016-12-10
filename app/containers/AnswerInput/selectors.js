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

const selectInputDisabled = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('inputDisabled'),
);

const selectkeysInListMatch = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('matches'),
);

const selectAnswerValid = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('valid'),
);

const selectAnswerType = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('answerType'),
);

const selectAnswerMarked = () => createSelector(
  selectAnswerInputDomain(),
  (substate) => substate.get('marked'),
);

export default selectAnswerInputDomain;

export {
  selectInputText,
  selectInputDisabled,
  selectkeysInListMatch,
  selectAnswerMarked,
  selectAnswerValid,
  selectAnswerType,
};
