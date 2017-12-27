import { createSelector } from 'reselect';

const selectQuizDomain = (state) => state.quiz;

export const selectCategory = createSelector(selectQuizDomain, (state) => state.category);
export const selectBackup = createSelector(selectQuizDomain, (state) => state.backup);
export const selectQuizInfo = createSelector(selectQuizDomain, (state) => state.info);
export const selectInfoActivePanel = createSelector(selectQuizInfo, (state) => state.activePanel);
export const selectInfoDetailLevel = createSelector(selectQuizInfo, (state) => state.detailLevel);
export const selectInfoDisabled = createSelector(selectQuizInfo, (state) => state.isDisabled);

export const selectQuizAnswer = createSelector(selectQuizDomain, (state) => state.answer);
export const selectAnswerValue = createSelector(selectQuizAnswer, (state) => state.value);
export const selectAnswerMarked = createSelector(selectQuizAnswer, (state) => state.isMarked);
export const selectAnswerFocused = createSelector(selectQuizAnswer, (state) => state.isFocused);
export const selectAnswerValid = createSelector(selectQuizAnswer, (state) => state.isValid);
export const selectAnswerCorrect = createSelector(selectQuizAnswer, (state) => state.isCorrect);
export const selectAnswerIncorrect = createSelector(selectQuizAnswer, (state) => state.isIncorrect);
export const selectAnswerDisabled = createSelector(selectQuizAnswer, (state) => state.isDisabled);
