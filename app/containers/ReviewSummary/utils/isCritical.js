import getCorrectRatio, { calcAnsweredTotal } from './getCorrectRatio';

/**
 * Determines if review item is critical by comparing correct answers against total times answered
 * @param  {object} review Item to check
 * @param  {number} [threshold=0.75] Correctness ratio below which item is considered critical
 * @param  {number} [minimum=3] Number of times item must have been answered previously
 * @return {boolean} True if item is below critical threshold
 */
function isCritical(review, threshold = 0.75, minimum = 3) { // eslint-disable-line no-unused-vars
  return (calcAnsweredTotal(review) > minimum) && (getCorrectRatio(review) < threshold);
}

export default isCritical;
