// TODO: add tests, check if ignored prop is > 0 instead of the || 0 ?

/**
 * Calculate percentage of right answers out of 100
 * @param  {Number} correct   Answers correct
 * @param  {Number} completed Questions completed
 * @return {Number}           Percentage of correct answers
 */
export function calculatePercentage(correct = 0, completed = 0) {
  // "|| 0" to guard against dividing by 0 completed (when first answer was ignored)
  return Math.floor((correct / completed) * 100) || 0;
}

/**
 * Returns name of srs rank from provided number
 * @param  {Number} streak Current srs rank
 * @return {String}        Rank name
 */
export function getSrsRankName(streak = 0) {
  switch (true) {
    case (streak > 8): return 'BURNED';
    case (streak > 7): return 'ENLIGHTENED';
    case (streak > 6): return 'MASTER';
    case (streak > 4): return 'GURU';
    default: return 'APPRENTICE';
  }
}
