/* eslint-disable no-bitwise */
/**
 * Creates a randomised hex color string
 * @return {String} hex color
 * @example
 * randomHexColor()
 * // => '#ed6ae7'
 */
const randomHexColor = () => '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
/* eslint-enable no-bitwise */

export default randomHexColor;
