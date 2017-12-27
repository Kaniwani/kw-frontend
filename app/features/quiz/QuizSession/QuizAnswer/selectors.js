import { getState } from 'common/selectors';

export const UI_DOMAIN = 'quizAnswer';
export const selectQuizAnswer = getState(UI_DOMAIN);

export default selectQuizAnswer;
