/**
 * Returns random number between min and max inclusive
 * @param  {Number} [min=0] starting number
 * @param  {Number} [max=100] ending number
 * @return {Number} integer between min and max
 */
export default function randInRange(min = 0, max = 100) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}
