
/**
 * Determines if review item is critical by comparing correct answers against total times answered
 * @param  {object} review Item to check
 * @param  {number} [threshold=0.75] Correctness ratio below which item is considered critical
 * @param  {number} [minimum=2] Number of times item must have been answered previously
 * @return {boolean} True if item is below critical threshold
 */
function isCritical(review, threshold = 0.75, minimum = 2) { // eslint-disable-line no-unused-vars
  const correctTotal = review.getIn(['history', 'correct']) + review.getIn(['session', 'correct']);
  const answeredTotal = review.getIn(['history', 'incorrect']) + review.getIn(['session', 'incorrect']) + correctTotal;
  const correctRatio = correctTotal / answeredTotal;

  // TODO: uncomment after visual testing complete
  return /* answeredTotal > minimum && */ (correctRatio < threshold);
}

export default isCritical;
