export const calcCorrectTotal = (review) => review.history.correct + review.session.correct;
export const calcIncorrectTotal = (review) => review.history.incorrect + review.session.incorrect;
export const calcAnsweredTotal = (review) => calcCorrectTotal(review) + calcIncorrectTotal(review);
export const calcCorrectRatio = (correct, answered) => correct / answered;

/**
 * Calculates a correctness ratio by comparing correct answers against total times answered
 * @param  {object} review item to check
 * @return {number} ratio
 */
function getCorrectRatio(review) {
  const correctTotal = calcCorrectTotal(review);
  const answeredTotal = calcAnsweredTotal(review);
  return calcCorrectRatio(correctTotal, answeredTotal);
}

export default getCorrectRatio;
