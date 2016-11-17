/**
 * Calculates percentage to whole numbers, but always rounds down
 * (99.9, 100) => 99 (percent)
 *
 * @param  {Number} numerator Partial
 * @param  {Number} denominator Total
 * @return {Number} Percentage as integer
 */
export default function calculatePercentage(numerator, denominator) {
  // "|| 0" to guard against dividing 0 by 0 => NaN
  return Math.floor((numerator / denominator) * 100) || 0;
}
