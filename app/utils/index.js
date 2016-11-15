// TODO: add tests

import { SRS_RANKS } from 'shared/constants';

/**
 * Calculate percentage out of 100
 *
 * @param  {Number} numerator   Answers correct
 * @param  {Number} denominator Questions completed
 * @return {Number}           Percentage of correct answers
 */
export function calculatePercentage(numerator, denominator) {
  const [numType, denomType] = [typeof numerator, typeof denominator];

  if (numType !== 'number' || denomType !== 'number') {
    console.warn(`Invalid params provided to calculatePercentage:
      numerator: ${numerator} of type ${numType}
      denominator: ${denominator} of type ${denomType}
    `);
  }

  // "|| 0" to guard against dividing 0 by 0 => NaN
  return Math.floor((numerator / denominator) * 100) || 0;
}

/**
 * Returns name of srs rank from provided number
 *
 * @param  {Number} streak Current srs rank
 * @return {String}        Rank name
 */
export function getSrsRankName(streak) {
  const streakType = typeof streak;
  if (streakType !== 'number') {
    console.warn(`
      Invalid streak provided to getSrsRankName:
      ${streak} of type ${streakType}
    `);
  }
  switch (true) {
    case (streak > 8): return SRS_RANKS.FIVE;
    case (streak > 7): return SRS_RANKS.FOUR;
    case (streak > 6): return SRS_RANKS.THREE;
    case (streak > 4): return SRS_RANKS.TWO;
    default: return SRS_RANKS.ONE;
  }
}
