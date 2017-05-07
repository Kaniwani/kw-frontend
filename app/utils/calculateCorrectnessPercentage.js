import calculatePercentage from './calculatePercentage';

export const calculateCorrectTotal = (history, session) => history.correct + session.correct;
export const calculateIncorrectTotal = (history, session) => history.incorrect + session.incorrect;

/**
 * Calculates a correctness ratio by comparing correct answers against total times answered
 * @param  {{correct: number, incorrect: number}} history review entry history details
 * @param  {{correct: number, incorrect: number}} session review entry sessionss details
 * @return {Number} correctness percentage
 */
function calculateCorrectnessPercentage(history, session) {
  const correctTotal = calculateCorrectTotal(history, session);
  const answeredTotal = correctTotal + calculateIncorrectTotal(history, session);
  return calculatePercentage(correctTotal, answeredTotal);
}

export default calculateCorrectnessPercentage;
