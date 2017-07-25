
/**
 * Determines criticality by comparing correct answers against total times answered
 * @param  {number} correct answered correctly count
 * @param  {number} incorrect answered incorrectly count
 * @param  {number} [threshold=0.75] Correctness ratio below which item is considered critical
 * @param  {number} [minimum=4] Number of times item must have been answered previously
 * @return {boolean} True if item is below critical threshold
 */
function determineCriticality(correct = 0, incorrect = 0, threshold = 0.75, minimum = 4) {
  const answered = correct + incorrect;
  const correctRatio = correct / answered;
  return (answered >= minimum) && (correctRatio < threshold);
}

export default determineCriticality;
