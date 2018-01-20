import { createSelector } from 'reselect';
import { getState } from 'common/selectors';

export const UI_DOMAIN = 'quizInfo';
export const selectInfo = getState(UI_DOMAIN);
export const selectInfoOpen = createSelector(selectInfo, getState('isOpen', false));
export const selectInfoDisabled = createSelector(selectInfo, getState('isDisabled', true));
export const selectInfoDetailLevel = createSelector(selectInfo, getState('detailLevel', 0));

export default selectInfo;
