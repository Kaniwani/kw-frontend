/**
 * Returns random number between min and max inclusive
 * @param  {number} min starting number
 * @param  {number} max ending number
 * @return {number}
 */
export default function randInRange(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}
