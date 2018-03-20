import { createSelector } from 'reselect';
import { getState } from 'common/selectors';

export const UI_DOMAIN = 'quizAnswer';
export const selectAnswer = getState(UI_DOMAIN);
export const selectAnswerDisabled = createSelector(selectAnswer, getState('isDisabled', false));
export const selectAnswerIgnored = createSelector(selectAnswer, getState('isIgnored', false));

export default selectAnswer;
