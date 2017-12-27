import { createSelector } from 'reselect';
import { getState } from 'common/selectors';

export const UI_DOMAIN = 'quizInfo';
export const selectQuizInfo = getState(UI_DOMAIN);
export const selectInfoActivePanel = createSelector(selectQuizInfo, getState('activePanel', ''));
export const selectInfoDetailLevel = createSelector(selectQuizInfo, getState('detailLevel', 0));
export const selectInfoDisabled = createSelector(selectQuizInfo, getState('isDisabled', true));

export default selectQuizInfo;
