import { createSelector } from 'reselect';

const selectSessionDomain = (state) => state.session;
const selectQuiz = createSelector(selectSessionDomain, (state) => state.quiz);

export const selectQuizAnswer = createSelector(selectQuiz, (state) => state.answer);
export const selectAnswerValue = createSelector(selectQuizAnswer, (state) => state.value);
export const selectAnswerMarked = createSelector(selectQuizAnswer, (state) => state.isMarked);
export const selectAnswerFocused = createSelector(selectQuizAnswer, (state) => state.isFocused);
export const selectAnswerValid = createSelector(selectQuizAnswer, (state) => state.isValid);
export const selectAnswerCorrect = createSelector(selectQuizAnswer, (state) => state.isCorrect);
export const selectAnswerIncorrect = createSelector(selectQuizAnswer, (state) => state.isIncorrect);
export const selectAnswerDisabled = createSelector(selectQuizAnswer, (state) => state.isDisabled);
